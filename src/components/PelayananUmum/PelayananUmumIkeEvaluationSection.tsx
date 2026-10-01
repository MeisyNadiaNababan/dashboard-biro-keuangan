import React from 'react';
import {
  TrendingUp,
  Stethoscope,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Percent,
  Award,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react';

interface PelayananUmumIkeEvaluationSectionProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

// ----------------------------------------------------------------------------
// DATA RINCIAN UNTUK 3 IKP & SHEET KONSOLIDASI DEP-A6
// Sesuai Dokumen Resmi No: 6 /KA/ 3 /2025 (PERKIN A.6 Tahun 2025)
// ----------------------------------------------------------------------------

// 1. DATA IKP-1: Persentase Peningkatan Kinerja Badan Usaha (Target 1,1%)
export const IKP1_BADAN_USAHA_DATA = [
  {
    no: 1,
    namaUnit: 'BU Rumah Sakit (RSBP Batam)',
    kategori: 'Pelayanan Medis & BLU Penuh',
    pendapatanLalu: 'Rp 116,50 M',
    pendapatanIni: 'Rp 121,80 M',
    pertumbuhanPersen: 4.55,
    targetPersen: 1.1,
    capaianPersen: 413.6,
  },
  {
    no: 2,
    namaUnit: 'BU SPAM, Fasilitas & Lingkungan',
    kategori: 'Air Minum WTP, KPLI B3 & Rusun',
    pendapatanLalu: 'Rp 139,20 M',
    pendapatanIni: 'Rp 142,50 M',
    pertumbuhanPersen: 2.37,
    targetPersen: 1.1,
    capaianPersen: 215.5,
  },
  {
    no: 3,
    namaUnit: 'Total Konsolidasi 2 Badan Usaha',
    kategori: 'Agregat Pertumbuhan Finansial BU',
    pendapatanLalu: 'Rp 255,70 M',
    pendapatanIni: 'Rp 264,30 M',
    pertumbuhanPersen: 1.24,
    targetPersen: 1.1,
    capaianPersen: 112.7,
  },
];

// 2. DATA IKP-2: Rasio PNBP BU terhadap Target PNBP BP Batam (Target 0,68)
export const IKP2_RASIO_PNBP_DATA = [
  {
    no: 1,
    namaUnit: 'BU Rumah Sakit (RSBP Batam)',
    targetPnbp: 'Rp 115,00 M',
    realisasiPnbp: 'Rp 121,80 M',
    persenTargetBu: '105,9%',
    rasioBpBatam: '0,33',
    status: 'Melampaui',
  },
  {
    no: 2,
    namaUnit: 'BU SPAM, Fasilitas & Lingkungan',
    targetPnbp: 'Rp 130,00 M',
    realisasiPnbp: 'Rp 142,50 M',
    persenTargetBu: '109,6%',
    rasioBpBatam: '0,38',
    status: 'Melampaui',
  },
  {
    no: 3,
    namaUnit: 'Total Kontribusi 2 Badan Usaha',
    targetPnbp: 'Rp 245,00 M',
    realisasiPnbp: 'Rp 264,30 M',
    persenTargetBu: '107,9%',
    rasioBpBatam: '0,71',
    status: 'Target 0,68 Tercapai',
  },
];

// 3. DATA IKP-3: Rata-rata IKM Pengguna Layanan Badan Usaha (Target 88,31 Mutu A)
// Berdasarkan PermenPAN-RB No. 14 Tahun 2017
export const IKP3_UNSUR_IKM_DATA = [
  { no: 1, unsur: 'U1. Persyaratan Pelayanan', skorRs: 90.2, skorSpam: 88.5, skorRata: 89.35 },
  { no: 2, unsur: 'U2. Kemudahan Prosedur', skorRs: 88.6, skorSpam: 87.8, skorRata: 88.20 },
  { no: 3, unsur: 'U3. Kecepatan Waktu Layanan', skorRs: 85.8, skorSpam: 86.4, skorRata: 86.10 },
  { no: 4, unsur: 'U4. Kesesuaian Biaya/Tarif', skorRs: 91.2, skorSpam: 89.6, skorRata: 90.40 },
  { no: 5, unsur: 'U5. Spesifikasi Produk Layanan', skorRs: 89.4, skorSpam: 88.8, skorRata: 89.10 },
  { no: 6, unsur: 'U6. Kompetensi Petugas', skorRs: 92.5, skorSpam: 88.2, skorRata: 90.35 },
  { no: 7, unsur: 'U7. Perilaku & Kesopanan', skorRs: 91.8, skorSpam: 89.1, skorRata: 90.45 },
  { no: 8, unsur: 'U8. Kualitas Sarana & Prasarana', skorRs: 88.4, skorSpam: 89.0, skorRata: 88.70 },
  { no: 9, unsur: 'U9. Penanganan Keluhan & Saran', skorRs: 87.2, skorSpam: 88.2, skorRata: 87.70 },
];

// 4. DATA SHEET 4: Konsolidasi Kinerja, Pagu & Dampak Finansial 3 Unit Kerja Bidang A-6
export const KONSOLIDASI_3_UNIT_A6_DATA = [
  {
    no: 1,
    unit: 'Badan Usaha Rumah Sakit (RSBP)',
    kode: 'BURS',
    ikpUtama: 'Peningkatan Kinerja Medis & Rasio PNBP',
    paguDipa: 'Rp 120,00 M',
    realisasiBelanja: 'Rp 108,40 M (90,3%)',
    kontribusiPnbp: 'Rp 121,80 M',
    surplusFiskal: '+Rp 13,40 M (CRR 112,4%)',
    outputUtama: 'BOR 78,4%, 142.850 Pasien, 520 Cath Lab',
  },
  {
    no: 2,
    unit: 'BU SPAM, Fasilitas dan Lingkungan',
    kode: 'BUSPAM',
    ikpUtama: 'Pertumbuhan PNBP Air Curah, Limbah B3, Rusun',
    paguDipa: 'Rp 135,00 M',
    realisasiBelanja: 'Rp 124,20 M (92,0%)',
    kontribusiPnbp: 'Rp 142,50 M',
    surplusFiskal: '+Rp 18,30 M (CRR 114,7%)',
    outputUtama: '3.420 L/s WTP, 14.850 Ton B3, Okupansi 91,5%',
  },
  {
    no: 3,
    unit: 'Direktorat Pengamanan Aset dan Kawasan',
    kode: 'DITPAM',
    ikpUtama: 'Public Safety, Penertiban Bangli & DTA Waduk',
    paguDipa: 'Rp 45,00 M',
    realisasiBelanja: 'Rp 41,60 M (92,4%)',
    kontribusiPnbp: 'Rp 3,80 M',
    surplusFiskal: '-Rp 37,80 M (Cost Center DIPA)',
    outputUtama: '874 Bangli Ditertibkan, 480 Personel Khusus',
  },
];

export const PelayananUmumIkeEvaluationSection: React.FC<
  PelayananUmumIkeEvaluationSectionProps
> = ({ onOpenFormulaModal }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3.5 font-sans">
      {/* 1. Header with Title (Persis Format DEP-A3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900 flex items-center gap-2">
              <span>Capaian Evaluasi 3 Indikator Kinerja Program (IKP)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                DEP-A6 BP BATAM
              </span>
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Evaluasi kinerja program terpadu mencakup peningkatan kinerja badan usaha, rasio PNBP terhadap BP Batam, mutu IKM PermenPAN-RB, serta konsolidasi sinergi 3 unit pilar
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0 self-start sm:self-auto">
          Tampilan 4 Card Sebaris
        </span>
      </div>

      {/* 2. Grid 4 Card Sebaris (2x2 Grid Persis DEP-A3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* =================================================================== */}
        {/* CARD 1: IKP-1 PERSENTASE PENINGKATAN KINERJA BADAN USAHA           */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded text-[10px] border border-blue-200 flex items-center gap-1">
              <Percent className="w-3 h-3 text-blue-700" />
              <span>IKP #1 • PERKIN A6.01</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                112,73% (Melampaui)
              </span>
              {onOpenFormulaModal && (
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-1')}
                  className="text-blue-600 hover:text-blue-800 font-bold text-[10px] cursor-pointer"
                  title="Lihat Formula Resmi"
                >
                  Kamus
                </button>
              )}
            </div>
          </div>

          <div>
            <h5 className="font-black text-slate-900 text-xs sm:text-sm">
              Persentase Peningkatan Kinerja Badan Usaha
            </h5>
            <div className="flex items-baseline justify-between mt-1 text-xs">
              <span className="text-slate-500 text-[11px]">Target Perkin: <strong className="text-slate-700 font-mono">1,1%</strong></span>
              <span className="text-slate-500 text-[11px]">Realisasi Capaian: <strong className="text-blue-700 font-mono font-extrabold">+1,24%</strong></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Tabel Detail 2 Badan Usaha */}
          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[9.5px] font-mono border-b border-slate-100">
                <tr>
                  <th className="py-1.5 px-2">No</th>
                  <th className="py-1.5 px-2">Badan Usaha (BU)</th>
                  <th className="py-1.5 px-2 text-right">Pendapatan 2024</th>
                  <th className="py-1.5 px-2 text-right">Pendapatan 2025</th>
                  <th className="py-1.5 px-2 text-right">% Tumbuh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {IKP1_BADAN_USAHA_DATA.slice(0, 2).map((item) => (
                  <tr key={item.no} className="hover:bg-slate-50/80">
                    <td className="py-1.5 px-2 font-mono text-slate-400">{item.no}</td>
                    <td className="py-1.5 px-2 font-bold text-slate-800">{item.namaUnit}</td>
                    <td className="py-1.5 px-2 font-mono text-slate-600 text-right">{item.pendapatanLalu}</td>
                    <td className="py-1.5 px-2 font-mono text-blue-700 font-bold text-right">{item.pendapatanIni}</td>
                    <td className="py-1.5 px-2 font-mono font-black text-emerald-700 text-right">
                      +{item.pertumbuhanPersen}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500 font-semibold">Total Gabungan 2 BU:</span>
            <span className="font-extrabold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Pertumbuhan +1,24% (Melampaui Target 1,1%)
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* CARD 2: IKP-2 RASIO PNBP BU TERHADAP PNBP BP BATAM                 */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px] border border-emerald-200 flex items-center gap-1">
              <Calculator className="w-3 h-3 text-emerald-700" />
              <span>IKP #2 • PERKIN A6.02</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                104,41% (Tercapai)
              </span>
              {onOpenFormulaModal && (
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-2')}
                  className="text-emerald-600 hover:text-emerald-800 font-bold text-[10px] cursor-pointer"
                  title="Lihat Formula Resmi"
                >
                  Kamus
                </button>
              )}
            </div>
          </div>

          <div>
            <h5 className="font-black text-slate-900 text-xs sm:text-sm">
              Rasio PNBP BU terhadap PNBP BP Batam
            </h5>
            <div className="flex items-baseline justify-between mt-1 text-xs">
              <span className="text-slate-500 text-[11px]">Target Rasio: <strong className="text-slate-700 font-mono">0,68</strong></span>
              <span className="text-slate-500 text-[11px]">Realisasi Rasio: <strong className="text-emerald-700 font-mono font-extrabold">0,71</strong></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Tabel Detail Rasio PNBP */}
          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[9.5px] font-mono border-b border-slate-100">
                <tr>
                  <th className="py-1.5 px-2">No</th>
                  <th className="py-1.5 px-2">Badan Usaha</th>
                  <th className="py-1.5 px-2 text-right">Target PNBP</th>
                  <th className="py-1.5 px-2 text-right">Realisasi PNBP</th>
                  <th className="py-1.5 px-2 text-right">Rasio thd BP Batam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {IKP2_RASIO_PNBP_DATA.slice(0, 2).map((item) => (
                  <tr key={item.no} className="hover:bg-slate-50/80">
                    <td className="py-1.5 px-2 font-mono text-slate-400">{item.no}</td>
                    <td className="py-1.5 px-2 font-bold text-slate-800">{item.namaUnit}</td>
                    <td className="py-1.5 px-2 font-mono text-slate-600 text-right">{item.targetPnbp}</td>
                    <td className="py-1.5 px-2 font-mono text-emerald-700 font-bold text-right">{item.realisasiPnbp}</td>
                    <td className="py-1.5 px-2 font-mono font-black text-slate-900 text-right">
                      {item.rasioBpBatam}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500 font-semibold">Total Rasio Kontribusi:</span>
            <span className="font-extrabold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Rasio 0,71 (Target 0,68 Terpenuhi)
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* CARD 3: IKP-3 RATA-RATA IKM PENGGUNA LAYANAN BADAN USAHA           */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded text-[10px] border border-purple-200 flex items-center gap-1">
              <Award className="w-3 h-3 text-purple-700" />
              <span>IKP #3 • PERKIN A6.03</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-purple-600" />
                100,40% (Mutu A)
              </span>
              {onOpenFormulaModal && (
                <button
                  type="button"
                  onClick={() => onOpenFormulaModal('ikp-3')}
                  className="text-purple-600 hover:text-purple-800 font-bold text-[10px] cursor-pointer"
                  title="Lihat Formula Resmi"
                >
                  Kamus
                </button>
              )}
            </div>
          </div>

          <div>
            <h5 className="font-black text-slate-900 text-xs sm:text-sm">
              Rata-rata IKM Pengguna Layanan Badan Usaha
            </h5>
            <div className="flex items-baseline justify-between mt-1 text-xs">
              <span className="text-slate-500 text-[11px]">Target Perkin: <strong className="text-slate-700 font-mono">88,31 (Mutu A)</strong></span>
              <span className="text-slate-500 text-[11px]">Realisasi Capaian: <strong className="text-purple-700 font-mono font-extrabold">88,66 (Sangat Baik)</strong></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Tabel Detail 9 Unsur Layanan PermenPAN-RB */}
          <div className="overflow-x-auto border border-slate-100 rounded-lg max-h-40 overflow-y-auto">
            <table className="w-full text-left text-[10.5px]">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[9px] font-mono sticky top-0 border-b border-slate-100">
                <tr>
                  <th className="py-1 px-1.5">No</th>
                  <th className="py-1 px-1.5">9 Unsur Layanan</th>
                  <th className="py-1 px-1.5 text-right">RSBP</th>
                  <th className="py-1 px-1.5 text-right">SPAM</th>
                  <th className="py-1 px-1.5 text-right">Rata Gabungan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {IKP3_UNSUR_IKM_DATA.map((row) => (
                  <tr key={row.no} className="hover:bg-slate-50/80">
                    <td className="py-1 px-1.5 font-mono text-slate-400">{row.no}</td>
                    <td className="py-1 px-1.5 text-slate-700 font-medium">{row.unsur}</td>
                    <td className="py-1 px-1.5 font-mono text-rose-600 text-right">{row.skorRs.toFixed(1)}</td>
                    <td className="py-1 px-1.5 font-mono text-cyan-700 text-right">{row.skorSpam.toFixed(1)}</td>
                    <td className="py-1 px-1.5 font-mono font-bold text-purple-700 text-right">{row.skorRata.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500 font-semibold">Mutu Pelayanan Gabungan:</span>
            <span className="font-extrabold text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Skor 88,66 • Mutu A (PermenPAN-RB 14/2017)
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* CARD 4: KONSOLIDASI KINERJA, PAGU & DAMPAK FINANSIAL 3 UNIT DEP-A6  */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px] border border-slate-200 flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-700" />
              <span>KONSOLIDASI STRATEGIS DEP-A6</span>
            </span>
            <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Surplus BU: +Rp 31,7 M
            </span>
          </div>

          <div>
            <h5 className="font-black text-slate-900 text-xs sm:text-sm">
              Sinergi Finansial &amp; Operasional 3 Unit Satker
            </h5>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Integrasi Badan Usaha Rumah Sakit, BU SPAM Fasling, dan Dit. Pengamanan Aset
            </p>
          </div>

          {/* Tabel Detail 3 Unit */}
          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left text-[10.5px]">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[9px] font-mono border-b border-slate-100">
                <tr>
                  <th className="py-1.5 px-2">Unit Satker</th>
                  <th className="py-1.5 px-2">Pagu Belanja</th>
                  <th className="py-1.5 px-2">Serapan</th>
                  <th className="py-1.5 px-2">PNBP</th>
                  <th className="py-1.5 px-2">Kinerja Fungsional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {KONSOLIDASI_3_UNIT_A6_DATA.map((row) => (
                  <tr key={row.no} className="hover:bg-slate-50/80">
                    <td className="py-1.5 px-2 font-bold text-slate-800">
                      <div>{row.unit}</div>
                      <span className="text-[9px] text-slate-400 font-mono">{row.kode}</span>
                    </td>
                    <td className="py-1.5 px-2 font-mono text-slate-600">{row.paguDipa}</td>
                    <td className="py-1.5 px-2 font-mono font-bold text-blue-700">{row.realisasiBelanja}</td>
                    <td className="py-1.5 px-2 font-mono font-bold text-emerald-700">{row.kontribusiPnbp}</td>
                    <td className="py-1.5 px-2 text-[10px] text-slate-600 font-medium">{row.outputUtama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-500 font-semibold">Total Konsolidasi DEP-A6:</span>
            <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Pagu Rp 300M • Belanja 91,4% • PNBP Rp 268,1M
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
