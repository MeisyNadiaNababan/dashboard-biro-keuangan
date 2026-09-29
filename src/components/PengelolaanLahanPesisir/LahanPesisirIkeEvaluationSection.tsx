import React from 'react';
import {
  TrendingUp,
  MapPin,
  Anchor,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Sparkles,
} from 'lucide-react';

interface LahanPesisirIkeEvaluationSectionProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

// ----------------------------------------------------------------------------
// DATA RINCIAN UNTUK 3 IKP & SHEET KONSOLIDASI DEP-A3
// Sesuai Instruksi User:
// - Card 1 & 2 kolom HANYA: Nama Perusahaan, Wilayah, Luas
// - Card 3 kolom Kepatuhan DIHAPUS
// ----------------------------------------------------------------------------

// 1. DATA IKP-1: Luas Lahan Dialokasikan untuk Investasi (Target 200 Ha)
export const IKP1_PERUSAHAAN_DATA = [
  {
    no: 1,
    namaPerusahaan: 'PT Nongsa Digital Park',
    wilayah: 'SWP II Nongsa (KEK Digital)',
    luasHa: 58.2,
  },
  {
    no: 2,
    namaPerusahaan: 'PT Kabil Citranusa',
    wilayah: 'SWP III Kabil (Industri Berat)',
    luasHa: 96.4,
  },
  {
    no: 3,
    namaPerusahaan: 'PT Batam City Centre Propertindo',
    wilayah: 'SWP I Batam Centre (Komersial)',
    luasHa: 41.8,
  },
  {
    no: 4,
    namaPerusahaan: 'PT Batam Island Hospital & Wellness',
    wilayah: 'SWP V Sekupang (KEK Kesehatan)',
    luasHa: 31.5,
  },
  {
    no: 5,
    namaPerusahaan: 'PT Batam Integrated Logistics',
    wilayah: 'SWP IV Batu Ampar (Depo Logistik)',
    luasHa: 20.6,
  },
];

// 2. DATA IKP-2: Luas Izin Kawasan Pesisir & Reklamasi Investasi (Target 150 Ha)
export const IKP2_PERUSAHAAN_DATA = [
  {
    no: 1,
    namaPerusahaan: 'PT Kabil Indonusa Maritim',
    wilayah: 'Kabil & Pesisir Timur',
    luasHa: 56.2,
  },
  {
    no: 2,
    namaPerusahaan: 'PT Tanjung Sauh Port Development',
    wilayah: 'Tanjung Sauh',
    luasHa: 44.8,
  },
  {
    no: 3,
    namaPerusahaan: 'PT Sambau Luxury Marina & Resort',
    wilayah: 'Nongsa & Sambau (Pesisir Utara)',
    luasHa: 32.5,
  },
  {
    no: 4,
    namaPerusahaan: 'PT Sekupang Shipyard Nusantara',
    wilayah: 'Batam Barat & Sekupang',
    luasHa: 19.4,
  },
  {
    no: 5,
    namaPerusahaan: 'PT Galang Bahari Nusantara',
    wilayah: 'Galang & Sekitarnya',
    luasHa: 9.9,
  },
];

// 3. DATA IKP-3: Keberhasilan Pengawasan & Pengendalian Lahan, Pesisir, Reklamasi (Target 80%)
// Kolom Kepatuhan DIHAPUS sesuai permintaan user
export const IKP3_PENGAWASAN_DATA = [
  {
    no: 1,
    komponen: 'Pengawasan Kesesuaian Pemanfaatan Lahan (5 SWP)',
    bobot: 35,
    targetObjek: 180,
    realisasiObjek: 174,
    poinTerbobot: 33.83,
  },
  {
    no: 2,
    komponen: 'Penertiban Lahan Mangkrak (SP-1 s.d SP-3 & Rekuperasi)',
    bobot: 25,
    targetObjek: 90,
    realisasiObjek: 86,
    poinTerbobot: 23.89,
  },
  {
    no: 3,
    komponen: 'Pengawasan Sempadan Pesisir & Reklamasi Non-Izin',
    bobot: 20,
    targetObjek: 80,
    realisasiObjek: 75,
    poinTerbobot: 18.75,
  },
  {
    no: 4,
    komponen: 'Rekomendasi Teknis Pembaruan & Tindak Lanjut BAPL',
    bobot: 20,
    targetObjek: 100,
    realisasiObjek: 87,
    poinTerbobot: 17.4,
  },
];

// 4. DATA SHEET 4: Konsolidasi Kinerja, Pagu & Dampak Investasi 3 Unit Kerja Bidang A-3
export const KONSOLIDASI_3_UNIT_A3_DATA = [
  {
    no: 1,
    unit: 'Direktorat Pengelolaan Lahan',
    kode: 'DPL',
    ikpUtama: 'Luas Alokasi Lahan Investasi (IKP-1)',
    paguDipa: 'Rp 48,20 M',
    realisasiAnggaran: 'Rp 19,85 M (41,2%)',
    kontribusiPnbp: 'Rp 714,0 Miliar',
    outputUtama: '248,5 Ha Teralokasi (124,25%)',
  },
  {
    no: 2,
    unit: 'Dit. Pengelolaan Kawasan Pesisir & Reklamasi',
    kode: 'DPKPR',
    ikpUtama: 'Luas Izin Pesisir & Reklamasi (IKP-2)',
    paguDipa: 'Rp 21,50 M',
    realisasiAnggaran: 'Rp 8,12 M (37,8%)',
    kontribusiPnbp: 'Rp 68,5 Miliar',
    outputUtama: '162,8 Ha Izin Terbit (108,53%)',
  },
  {
    no: 3,
    unit: 'Dit. Pengendalian Pengelolaan Lahan, Pesisir',
    kode: 'DP2LPR',
    ikpUtama: 'Pengawasan dan Pengendalian Lahan, Pesisir, dan Reklamasi (IKP-3)',
    paguDipa: 'Rp 22,80 M',
    realisasiAnggaran: 'Rp 8,88 M (38,9%)',
    kontribusiPnbp: 'Rp 18,2 Miliar',
    outputUtama: '422 Objek Terawasi (93,8% Realisasi)',
  },
];

export const LahanPesisirIkeEvaluationSection: React.FC<
  LahanPesisirIkeEvaluationSectionProps
> = ({ onOpenFormulaModal }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3.5">
      {/* 1. Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900 flex items-center gap-2">
              <span>Capaian Evaluasi 3 Indikator Kinerja Program (IKP)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                DEP-A3 BP BATAM
              </span>
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Evaluasi kinerja program terpadu mencakup alokasi lahan investasi, izin pesisir &amp; reklamasi, pengawasan serta konsolidasi sinergi 3 unit pilar
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0 self-start sm:self-auto">
          Tampilan 4 Card Sebaris
        </span>
      </div>

      {/* 2. Grid 4 Card Sebaris (2x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* =================================================================== */}
        {/* CARD 1: IKP-1 LUAS LAHAN YANG DIALOKASIKAN UNTUK INVESTASI        */}
        {/* KOLOM: NAMA PERUSAHAAN, WILAYAH, LUAS                            */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded text-[10px] border border-blue-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-700" />
              IKP-1 &bull; DIT. PENGELOLAAN LAHAN
            </span>
            <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
              124.25% Melampaui Target
            </span>
          </div>

          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Luas Lahan yang Dialokasikan untuk Investasi
            </h5>
            <span className="text-[10px] text-slate-500 font-mono block">
              Unit: Direktorat Pengelolaan Lahan BP Batam (Halaman 6-8)
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-slate-900">248.50</span>
                <span className="text-[10.5px] font-bold text-slate-500">Hektar</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Target: <strong className="text-slate-800">200.00 Ha</strong> (+48,50 Ha)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div style={{ width: '100%' }} className="bg-blue-600 h-full rounded-full" />
            </div>
          </div>

          {/* Tabel Rincian Alokasi: HANYA Nama Perusahaan, Wilayah, Luas */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Daftar Alokasi Lahan Investasi:</span>
              <span className="text-[9px] font-mono text-slate-500">5 Perusahaan Sampel</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                    <th className="py-1 px-2">Nama Perusahaan</th>
                    <th className="py-1 px-2">Wilayah</th>
                    <th className="py-1 px-2 text-right">Luas (Ha)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {IKP1_PERUSAHAAN_DATA.map((item) => (
                    <tr key={item.no} className="hover:bg-white transition-colors">
                      <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[170px]" title={item.namaPerusahaan}>
                        {item.namaPerusahaan}
                      </td>
                      <td className="py-1.5 px-2 font-sans text-slate-600 truncate max-w-[150px]" title={item.wilayah}>
                        {item.wilayah}
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-black text-blue-700">
                        {item.luasHa.toFixed(2)} Ha
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50/80 font-bold text-slate-900 border-t border-blue-200 text-[9.5px]">
                    <td className="py-1.5 px-2 font-bold text-blue-950">
                      Total Alokasi Investasi
                    </td>
                    <td className="py-1.5 px-2 font-mono text-blue-900 text-[9px]">
                      KPBPB Batam (Target: 200,00 Ha)
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-blue-950">
                      248.50 Ha
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenFormulaModal?.('ikp-1-lahan-investasi')}
            className="w-full text-center text-[10px] text-blue-700 hover:text-blue-900 font-bold py-1 bg-white hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs mt-1"
          >
            <Calculator className="w-3 h-3 text-blue-600" />
            <span>Lihat Manual &amp; Formula IKP-1 (Pengelolaan Lahan)</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* CARD 2: IKP-2 LUAS IZIN PESISIR & REKLAMASI UNTUK INVESTASI        */}
        {/* KOLOM: NAMA PERUSAHAAN, WILAYAH, LUAS                            */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-cyan-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded text-[10px] border border-cyan-200 flex items-center gap-1">
              <Anchor className="w-3 h-3 text-cyan-700" />
              IKP-2 &bull; DIT. PESISIR &amp; REKLAMASI
            </span>
            <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
              108.53% Tercapai Sangat Baik
            </span>
          </div>

          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Luas Izin Kawasan Pesisir &amp; Izin Reklamasi Investasi
            </h5>
            <span className="text-[10px] text-slate-500 font-mono block">
              Unit: Dit. Pengelolaan Kawasan Pesisir dan Reklamasi (Hal. 13-14)
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-slate-900">162.80</span>
                <span className="text-[10.5px] font-bold text-slate-500">Hektar</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Target: <strong className="text-slate-800">150.00 Ha</strong> (+12,80 Ha)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div style={{ width: '100%' }} className="bg-cyan-600 h-full rounded-full" />
            </div>
          </div>

          {/* Tabel Rincian Izin Pesisir: HANYA Nama Perusahaan, Wilayah, Luas */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Daftar Izin Pesisir &amp; Reklamasi (PKKPRL):</span>
              <span className="text-[9px] font-mono text-slate-500">5 Perusahaan Sampel</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                    <th className="py-1 px-2">Nama Perusahaan</th>
                    <th className="py-1 px-2">Wilayah</th>
                    <th className="py-1 px-2 text-right">Luas (Ha)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {IKP2_PERUSAHAAN_DATA.map((item) => (
                    <tr key={item.no} className="hover:bg-white transition-colors">
                      <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[170px]" title={item.namaPerusahaan}>
                        {item.namaPerusahaan}
                      </td>
                      <td className="py-1.5 px-2 font-sans text-slate-600 truncate max-w-[150px]" title={item.wilayah}>
                        {item.wilayah}
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-black text-cyan-700">
                        {item.luasHa.toFixed(2)} Ha
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-cyan-50/80 font-bold text-slate-900 border-t border-cyan-200 text-[9.5px]">
                    <td className="py-1.5 px-2 font-bold text-cyan-950">
                      Total Izin Pesisir &amp; Reklamasi
                    </td>
                    <td className="py-1.5 px-2 font-mono text-cyan-900 text-[9px]">
                      Ruang Laut KPBPB (Target: 150,00 Ha)
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-cyan-950">
                      162.80 Ha
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenFormulaModal?.('ikp-2-pesisir-reklamasi')}
            className="w-full text-center text-[10px] text-cyan-700 hover:text-cyan-900 font-bold py-1 bg-white hover:bg-cyan-50 rounded-lg border border-cyan-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs mt-1"
          >
            <Calculator className="w-3 h-3 text-cyan-600" />
            <span>Lihat Manual &amp; Formula IKP-2 (Pesisir &amp; Reklamasi)</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* CARD 3: IKP-3 PENGAWASAN DAN PENGENDALIAN LAHAN, PESISIR, REKLAMASI */}
        {/* KOLOM KEPATUHAN DIHAPUS                                            */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px] border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              IKP-3 &bull; DIT. PENGENDALIAN PENGELOLAAN LAHAN
            </span>
            <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
              117.25% Kepatuhan Tinggi
            </span>
          </div>

          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Persentase Keberhasilan Pengawasan dan Pengendalian
            </h5>
            <span className="text-[10px] text-slate-500 font-mono block">
              Unit: Dit. Pengendalian Pengelolaan Lahan, Pesisir dan Reklamasi (Hal. 11)
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-slate-900">93.80</span>
                <span className="text-[10.5px] font-bold text-slate-500">% Realisasi</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Target: <strong className="text-slate-800">80.00%</strong> (+13,80%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div style={{ width: '100%' }} className="bg-emerald-600 h-full rounded-full" />
            </div>
          </div>

          {/* Tabel Komponen Pengawasan: TANPA kolom Kepatuhan */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Tabel Komponen Pengawasan &amp; Penertiban:</span>
              <span className="text-[9px] font-mono text-slate-500">4 Sub-Sektor</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                    <th className="py-1 px-2">Komponen Pengawasan</th>
                    <th className="py-1 px-1.5 text-center">Bobot</th>
                    <th className="py-1 px-1.5 text-center">Objek (Realisasi/Target)</th>
                    <th className="py-1 px-2 text-right">Poin Capaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {IKP3_PENGAWASAN_DATA.map((item) => (
                    <tr key={item.no} className="hover:bg-white transition-colors">
                      <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[170px]" title={item.komponen}>
                        {item.komponen}
                      </td>
                      <td className="py-1.5 px-1.5 text-center font-mono text-slate-500">
                        {item.bobot}%
                      </td>
                      <td className="py-1.5 px-1.5 text-center font-mono font-bold text-slate-700">
                        {item.realisasiObjek} / {item.targetObjek}
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-black text-emerald-700">
                        {item.poinTerbobot.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50/80 font-bold text-slate-900 border-t border-emerald-200 text-[9.5px]">
                    <td className="py-1.5 px-2 font-bold text-emerald-950">
                      Total Realisasi Pengawasan
                    </td>
                    <td className="py-1.5 px-1.5 text-center font-mono text-emerald-900">100%</td>
                    <td className="py-1.5 px-1.5 text-center font-mono text-emerald-900 font-bold">422 / 450</td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-emerald-950">
                      93.80% (Tgt 80%)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenFormulaModal?.('ikp-3-pengawasan-pengendalian')}
            className="w-full text-center text-[10px] text-emerald-700 hover:text-emerald-900 font-bold py-1 bg-white hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs mt-1"
          >
            <Calculator className="w-3 h-3 text-emerald-600" />
            <span>Lihat Manual &amp; Formula IKP-3 (Pengendalian Lahan)</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* CARD 4: SHEET KONSOLIDASI SINERGI 3 UNIT A-3                      */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded text-[10px] border border-indigo-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-700" />
              KONSOLIDASI &bull; 3 UNIT PILAR PERKIN A3
            </span>
            <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-indigo-100 text-indigo-800 border border-indigo-200">
              116.68% Rata-Rata Capaian
            </span>
          </div>

          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Matriks Sinergi Anggaran, PNBP &amp; Capaian 3 Satker
            </h5>
            <span className="text-[10px] text-slate-500 font-mono block">
              Integrasi Portofolio: Lahan (15 DS), Pesisir (4 DS), Pengendalian (4 DS)
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-indigo-900">800.70</span>
                <span className="text-[10.5px] font-bold text-slate-500">Miliar PNBP</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Total Pagu DIPA: <strong className="text-slate-800">Rp 92,50 M</strong> (Serapan 39,8%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div style={{ width: '100%' }} className="bg-indigo-600 h-full rounded-full" />
            </div>
          </div>

          {/* Tabel Matriks Konsolidasi 3 Satker */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Kontribusi 3 Unit Pelaksana Bidang Deputi A3:</span>
              <span className="text-[9px] font-mono text-slate-500">Konsolidasi Terpadu</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                    <th className="py-1 px-1.5">Satker Pelaksana</th>
                    <th className="py-1 px-1 text-center">Pagu</th>
                    <th className="py-1 px-1 text-right">Serapan</th>
                    <th className="py-1 px-1.5 text-right">PNBP</th>
                    <th className="py-1 px-1.5 text-right">Output Kunci</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {KONSOLIDASI_3_UNIT_A3_DATA.map((item) => (
                    <tr key={item.no} className="hover:bg-white transition-colors">
                      <td className="py-1 px-1.5 font-sans truncate max-w-[130px]" title={item.unit}>
                        <span className="font-bold text-slate-900 block truncate">{item.kode}</span>
                        <span className="text-[8.5px] text-slate-500 truncate block">{item.unit}</span>
                      </td>
                      <td className="py-1 px-1 text-center font-mono text-slate-600">
                        {item.paguDipa}
                      </td>
                      <td className="py-1 px-1 text-right font-mono text-slate-800 font-semibold">
                        {item.realisasiAnggaran}
                      </td>
                      <td className="py-1 px-1.5 text-right font-mono text-emerald-700 font-bold">
                        {item.kontribusiPnbp}
                      </td>
                      <td className="py-1 px-1.5 text-right font-mono text-[9px] text-indigo-700 font-bold truncate max-w-[110px]" title={item.outputUtama}>
                        {item.outputUtama}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-50/70 font-bold text-slate-900 border-t border-indigo-200 text-[9.5px]">
                    <td className="py-1 px-1.5 font-bold text-indigo-950">
                      Total Konsolidasi DEP-A3:
                    </td>
                    <td className="py-1 px-1 text-center font-mono text-indigo-900">Rp 92,50 M</td>
                    <td className="py-1 px-1 text-right font-mono text-indigo-900 font-black">
                      Rp 36,85 M (39,8%)
                    </td>
                    <td className="py-1 px-1.5 text-right font-mono text-emerald-800 font-black">
                      Rp 800,7 M
                    </td>
                    <td className="py-1 px-1.5 text-right font-mono text-indigo-950 font-black">
                      3 IKP Melampaui
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">Sinergi UWT Lahan Rp 714M + Jasa Pesisir Rp 68,5M + Pengawasan 422 Objek Wilayah KPBPB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
