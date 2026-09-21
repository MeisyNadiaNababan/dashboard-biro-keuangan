import React from 'react';
import { Download, Printer, FileText, CheckCircle2, Building2, Calendar, ShieldCheck } from 'lucide-react';
import {
  PNBP_BANDARA_ITEMS,
  TOTAL_ANGGARAN_PNBP,
  TOTAL_REALISASI_PNBP,
  CAPAIAN_TOTAL_PNBP_PERSEN,
  TOTAL_PENERBANGAN_TAHUNAN,
  TOTAL_PENUMPANG_TAHUNAN,
  TOTAL_KARGO_TON,
  AVERAGE_SEAT_LOAD_FACTOR,
  OPERATOR_FLIGHT_DATA,
  TREN_BULANAN_PENUMPANG,
  AIRPORT_TOP_ROUTES,
} from './bandaraData';

export const BandaraWordDocView: React.FC = () => {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatNumber = (val: number) => new Intl.NumberFormat('id-ID').format(val);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* TOP ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Dokumen Laporan Kinerja Eksekutif Kebandarudaraan (.docx / PDF)
            </h3>
            <p className="text-xs text-slate-500">
              Format Resmi Badan Pengusahaan Batam (Satu Data Hal 11-12 & Operator Penerbangan)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen</span>
          </button>
        </div>
      </div>

      {/* PAPER CANVAS SIMULATION */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-300 rounded-xl shadow-lg p-8 sm:p-12 text-slate-900 text-xs font-serif leading-relaxed">
        {/* KOP SURAT RESMI BP BATAM */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center relative">
          <div className="font-sans font-black text-sm tracking-wider uppercase text-slate-900">
            BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
          </div>
          <div className="font-sans font-bold text-xs uppercase tracking-normal text-sky-800 mt-0.5">
            DIREKTORAT PENGELOLAAN KAWASAN BANDARA
          </div>
          <div className="font-sans text-[11px] text-slate-600 mt-1">
            Gedung Terminal Bandara Internasional Hang Nadim, Jalan Hang Nadim No. 01, Batu Besar, Batam 29466
          </div>
          <div className="font-sans text-[10px] text-slate-500">
            Telepon: (0778) 761507 | Faksimile: (0778) 761813 | Website: bpbatam.go.id
          </div>
        </div>

        {/* JUDUL DOKUMEN LAPORAN */}
        <div className="text-center font-sans mb-8">
          <h2 className="text-sm font-bold uppercase underline tracking-wide text-slate-900">
            LAPORAN EKSEKUTIF KINERJA LALU LINTAS UDARA DAN REALISASI PNBP
          </h2>
          <div className="text-[11px] text-slate-600 mt-1">
            Nomor: LAP-EX/DPKB/BPB/09/2026 | Tanggal: 18 September 2026
          </div>
        </div>

        {/* SECTION 1: RINGKASAN CAPAIAN IKU UTAMA */}
        <div className="mb-6 font-sans">
          <h3 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
            I. RINGKASAN CAPAIAN INDIKATOR KINERJA UTAMA (IKU SATU DATA)
          </h3>
          <p className="text-slate-700 text-xs mb-3 text-justify">
            Berdasarkan Atribut Daftar Data Satu Data BP Batam (Halaman 11 No. 1 & No. 2), berikut ringkasan kinerja kebandarudaraan Hang Nadim:
          </p>

          <table className="w-full border-collapse border border-slate-300 text-xs mb-4">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold">
                <th className="border border-slate-300 p-2 text-center w-10">No</th>
                <th className="border border-slate-300 p-2 text-left">Indikator Kinerja Utama</th>
                <th className="border border-slate-300 p-2 text-left">Sumber Data</th>
                <th className="border border-slate-300 p-2 text-right">Target Anggaran</th>
                <th className="border border-slate-300 p-2 text-right">Realisasi Capaian</th>
                <th className="border border-slate-300 p-2 text-center">Persentase</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 p-2 text-center font-bold">1</td>
                <td className="border border-slate-300 p-2 font-semibold">Realisasi PNBP Kebandarudaraan</td>
                <td className="border border-slate-300 p-2">Satu Data Hal 11 DS #1</td>
                <td className="border border-slate-300 p-2 text-right font-mono">{formatIDR(TOTAL_ANGGARAN_PNBP)}</td>
                <td className="border border-slate-300 p-2 text-right font-bold text-sky-800 font-mono">{formatIDR(TOTAL_REALISASI_PNBP)}</td>
                <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">{CAPAIAN_TOTAL_PNBP_PERSEN}%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center font-bold">2</td>
                <td className="border border-slate-300 p-2 font-semibold">Total Penerbangan (Flight Movements)</td>
                <td className="border border-slate-300 p-2">Satu Data Hal 11 DS #2</td>
                <td className="border border-slate-300 p-2 text-right font-mono">35.000 Flight</td>
                <td className="border border-slate-300 p-2 text-right font-bold font-mono">{formatNumber(TOTAL_PENERBANGAN_TAHUNAN)} Flight</td>
                <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">109,8%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center font-bold">3</td>
                <td className="border border-slate-300 p-2 font-semibold">Total Penumpang Bandara</td>
                <td className="border border-slate-300 p-2">Satu Data Hal 11 DS #2</td>
                <td className="border border-slate-300 p-2 text-right font-mono">4.500.000 Pax</td>
                <td className="border border-slate-300 p-2 text-right font-bold font-mono">{formatNumber(TOTAL_PENUMPANG_TAHUNAN)} Pax</td>
                <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">108,1%</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center font-bold">4</td>
                <td className="border border-slate-300 p-2 font-semibold">Seat Load Factor (Rata-rata Okupansi)</td>
                <td className="border border-slate-300 p-2">Formula Rasio DS #2</td>
                <td className="border border-slate-300 p-2 text-right font-mono">80,0%</td>
                <td className="border border-slate-300 p-2 text-right font-bold font-mono">{AVERAGE_SEAT_LOAD_FACTOR}%</td>
                <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">Surplus</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 text-center font-bold">5</td>
                <td className="border border-slate-300 p-2 font-semibold">Volume Kargo Udara & Logistik (EMPU)</td>
                <td className="border border-slate-300 p-2">Satu Data Hal 12 DS #5</td>
                <td className="border border-slate-300 p-2 text-right font-mono">42.000 Ton</td>
                <td className="border border-slate-300 p-2 text-right font-bold font-mono">{formatNumber(TOTAL_KARGO_TON)} Ton</td>
                <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">110,2%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 2: RINCIAN KOMPONEN PNBP */}
        <div className="mb-6 font-sans">
          <h3 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
            II. RINCIAN REALISASI PNBP KEBANDARUDARAAN PER AKUN LAYANAN (DATASET NO. 1)
          </h3>
          <table className="w-full border-collapse border border-slate-300 text-xs mb-4">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold">
                <th className="border border-slate-300 p-2 text-left">Kode Akun</th>
                <th className="border border-slate-300 p-2 text-left">Jenis Penerimaan</th>
                <th className="border border-slate-300 p-2 text-right">Target Anggaran</th>
                <th className="border border-slate-300 p-2 text-right">Realisasi IDR</th>
                <th className="border border-slate-300 p-2 text-center">% Capaian</th>
              </tr>
            </thead>
            <tbody>
              {PNBP_BANDARA_ITEMS.map((item) => (
                <tr key={item.id}>
                  <td className="border border-slate-300 p-2 font-mono text-[11px]">{item.kodeAkun.split(' - ')[0]}</td>
                  <td className="border border-slate-300 p-2 font-medium">{item.jenisPenerimaan}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono">{formatIDR(item.anggaranPnbp)}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono font-bold text-sky-800">{formatIDR(item.realisasiTotalIdr)}</td>
                  <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">{item.persentaseCapaian}%</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold">
                <td colSpan={2} className="border border-slate-300 p-2 text-right">TOTAL PNBP BANDARA:</td>
                <td className="border border-slate-300 p-2 text-right font-mono">{formatIDR(TOTAL_ANGGARAN_PNBP)}</td>
                <td className="border border-slate-300 p-2 text-right font-mono text-sky-900">{formatIDR(TOTAL_REALISASI_PNBP)}</td>
                <td className="border border-slate-300 p-2 text-center text-emerald-700">{CAPAIAN_TOTAL_PNBP_PERSEN}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 3: DISTRIBUSI OPERATOR PENERBANGAN */}
        <div className="mb-6 font-sans">
          <h3 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
            III. DISTRIBUSI PENERBANGAN BERDASARKAN OPERATOR MASKAPAI (DATASET NO. 10 & PDF OP-PENERBANGAN)
          </h3>
          <table className="w-full border-collapse border border-slate-300 text-xs mb-4">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold">
                <th className="border border-slate-300 p-2 text-left">Nama Maskapai</th>
                <th className="border border-slate-300 p-2 text-center">Kode</th>
                <th className="border border-slate-300 p-2 text-left">Grup / Aliansi</th>
                <th className="border border-slate-300 p-2 text-right">Jumlah Penerbangan</th>
                <th className="border border-slate-300 p-2 text-center">Share (%)</th>
                <th className="border border-slate-300 p-2 text-right">Penumpang</th>
                <th className="border border-slate-300 p-2 text-center">SLF (%)</th>
              </tr>
            </thead>
            <tbody>
              {OPERATOR_FLIGHT_DATA.map((op) => (
                <tr key={op.id}>
                  <td className="border border-slate-300 p-2 font-semibold">{op.namaMaskapai}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold text-slate-700">{op.kodeIata}</td>
                  <td className="border border-slate-300 p-2">{op.kategori}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono font-bold">{formatNumber(op.jumlahPenerbangan)}</td>
                  <td className="border border-slate-300 p-2 text-center font-bold text-sky-800">{op.sharePersen}%</td>
                  <td className="border border-slate-300 p-2 text-right font-mono">{formatNumber(op.totalPenumpang)}</td>
                  <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">{op.loadFactorPersen}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TANDA TANGAN & PENGESAHAN */}
        <div className="pt-8 grid grid-cols-2 gap-8 font-sans text-xs mt-8 border-t border-slate-300">
          <div>
            <div className="text-slate-600">Mengetahui,</div>
            <div className="font-bold text-slate-900 mt-0.5">Anggota Bidang Pengelolaan Kawasan dan Investasi</div>
            <div className="font-bold text-slate-900">Badan Pengusahaan Batam</div>
            <div className="h-16" />
            <div className="font-bold underline text-slate-900">Dr. Ir. Sudirman Saad, M.Hum.</div>
            <div className="text-slate-500 text-[11px]">NIP. 19640815 199003 1 002</div>
          </div>

          <div className="text-right">
            <div className="text-slate-600">Batam, 18 September 2026</div>
            <div className="font-bold text-slate-900 mt-0.5">Direktur Pengelolaan Kawasan Bandara</div>
            <div className="font-bold text-slate-900">Bandara Internasional Hang Nadim</div>
            <div className="h-16" />
            <div className="font-bold underline text-slate-900">Capt. Ambar Suryoko, M.M.</div>
            <div className="text-slate-500 text-[11px]">NIP. 19710322 199603 1 001</div>
          </div>
        </div>
      </div>
    </div>
  );
};
