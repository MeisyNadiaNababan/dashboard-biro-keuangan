import React from 'react';
import {
  X,
  FileCode2,
  HelpCircle,
  CheckCircle2,
  Scale,
  Calculator,
  Database,
  ArrowRight,
  ShieldCheck,
  HardHat,
  Coins,
  Route,
  Zap,
  Trees,
  Mountain,
  Users,
  Flame,
  Layers,
} from 'lucide-react';
import { PERKIN_A7_KPIS, PERKIN_A7_METADATA } from './perkinA7Data';

interface InfrastrukturPerkinA7FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedKpiId: string | null;
}

// Full Dictionary of KPIs across Perkin A.7 & the 3 Work Units
const EXTENDED_FORMULA_DICTIONARY: Record<
  string,
  {
    code: string;
    name: string;
    unitPengampu: string;
    datasetSumber: string;
    deskripsi: string;
    formula: string;
    tableauCalculation: string;
    programTargetLabel: string;
    realizationLabel: string;
    achievement: number;
    status: string;
    catatanKinerja: string;
    halamanPdf: string;
    iconType: 'hardhat' | 'coins' | 'road' | 'utilitas' | 'tree' | 'mountain' | 'shield';
  }
> = {
  'ikp-1-pembangunan-infrastruktur': {
    code: 'IKP-1',
    name: 'Persentase Pembangunan Infrastruktur yang Selesai / Terlaksana Sesuai Rencana',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (DEP-A7-02)',
    datasetSumber: 'Satu Data Hal. 48-51 (Dataset 3 Ruas Jalan, Dataset 4 Progres Konstruksi & Dataset 6)',
    deskripsi:
      'Mengukur tingkat keberhasilan penyelesaian pekerjaan fisik infrastruktur (jalan, jembatan, gedung utilitas, drainase induk, dan dermaga) terhadap target rencana kerja tahunan berdasarkan kurva S kumulatif dan uji kelaikan fungsi.',
    formula:
      'IKP_1 = ( ∑ [Realisasi Fisik Terverifikasi Lapangan (Rp / %)] / ∑ [Target Rencana Fisik Kontraktual (Rp / %)] ) × 100%',
    tableauCalculation:
      '// Formula Tableau Desktop Calculated Field:\nZN(SUM([Realisasi_Fisik_Proyek])) / ZN(SUM([Target_Rencana_Fisik])) * 100',
    programTargetLabel: '100,00%',
    realizationLabel: '92,40%',
    achievement: 92.4,
    status: 'Sesuai Target / On Track',
    catatanKinerja:
      'Realisasi kumulatif hingga Triwulan berjalan mencapai 92,40% dengan 10 paket berstatus Ahead/On Schedule, 3 waspada, dan 1 paket SCM dalam percepatan shift malam.',
    halamanPdf: 'Dokumen Perkin A.7 Hal. 1 Poin 1',
    iconType: 'hardhat',
  },
  'ikp-2-pnbp-infrastruktur': {
    code: 'IKP-2',
    name: 'Persentase Realisasi PNBP dari Sektor Infrastruktur (ROW Utilitas)',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (DEP-A7-02)',
    datasetSumber: 'Satu Data Hal. 48 (Dataset 1: Rekapitulasi Perizinan Pemanfaatan ROW untuk Utilitas)',
    deskripsi:
      'Mengukur efektivitas penerimaan negara bukan pajak (PNBP) yang dihimpun dari izin pemanfaatan Right of Way (ROW) jalan untuk perlintasan pipa air minum, gas bumi, fiber optik telekomunikasi, dan transmisi kelistrikan.',
    formula:
      'IKP_2 = ( Realisasi Penerimaan PNBP Sektor Infrastruktur / Target Penerimaan PNBP Perkin ) × 100%\n= ( Rp 7.450.000.000 / Rp 6.821.000.000 ) × 100% = 109,22%',
    tableauCalculation:
      '// Formula Tableau Desktop Calculated Field:\nZN(SUM([Realisasi_PNBP_Infrastruktur])) / ZN(SUM([Target_PNBP_Perkin])) * 100',
    programTargetLabel: 'Rp 6,821 Miliar (100%)',
    realizationLabel: 'Rp 7,450 Miliar',
    achievement: 109.22,
    status: 'Melebihi Target / Ahead',
    catatanKinerja:
      'Penerimaan melampaui target tahunan sebesar 109,22% didorong oleh percepatan penggelaran kabel fiber optik bawah tanah dan pipa transmisi gas industri di Batam Centre & Kabil.',
    halamanPdf: 'Dokumen Perkin A.7 Hal. 1 Poin 2',
    iconType: 'coins',
  },
  'kpi-ruas-jalan': {
    code: 'SATU-DATA #3',
    name: 'Persentase Kemantapan Ruas Jaringan Jalan BP Batam (88,2%)',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (DEP-A7-02)',
    datasetSumber: 'Buku Satu Data Hal. 48-49 (Dataset 3: Jaringan Jalan Eksisting BP Batam)',
    deskripsi:
      'Menghitung rasio panjang ruas jalan dalam kondisi Mantap (Baik + Sedang) dibandingkan total panjang jaringan jalan eksisting BP Batam sepanjang 542,80 Km.',
    formula:
      'Kemantapan Jalan = ( Panjang Jalan Kondisi Mantap (Km) / Total Panjang Jalan (Km) ) × 100%\n= ( 478,75 Km / 542,80 Km ) × 100% = 88,20%',
    tableauCalculation:
      '// Formula Tableau:\nSUM(IF [LKONOF] = "Mantap" THEN [SHAPE_LENG] END) / SUM([SHAPE_LENG]) * 100',
    programTargetLabel: '85,00% Kemantapan',
    realizationLabel: '478,75 Km (88,20%)',
    achievement: 88.2,
    status: 'Memenuhi Standar Nasional',
    catatanKinerja:
      'Kondisi jalan arteri primer mencapai 94,1% mantap. Sisa 64,05 Km jalan tidak mantap dialokasikan pada program pemeliharaan berkala TA 2026.',
    halamanPdf: 'Satu Data Hal. 48-49',
    iconType: 'road',
  },
  'kpi-kurva-s': {
    code: 'SATU-DATA #4',
    name: 'Deviasi Kurva S & Kinerja Konstruksi Fisik Kontraktual',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (DEP-A7-02)',
    datasetSumber: 'Buku Satu Data Hal. 49-50 (Dataset 4: Laporan Progres Konstruksi & SCM)',
    deskripsi:
      'Memantau deviasi antara realisasi progres fisik lapangan dan rencana kurva S kontraktual mingguan. Deviasi di bawah -10% memicu rapat Show Cause Meeting (SCM).',
    formula:
      'Deviasi_Progres (%) = Realisasi_Fisik_Kumulatif (%) - Rencana_Fisik_Kumulatif (%)\nStatus Kritis jika Deviasi < -10,00%',
    tableauCalculation:
      '// Deviasi Kurva S Tableau:\n[PRGRS_REALISASI] - [PRGRS_RENCANA]',
    programTargetLabel: 'Deviasi >= 0%',
    realizationLabel: 'Rata-rata Deviasi +2,4%',
    achievement: 102.4,
    status: 'Terkendali (1 Paket SCM)',
    catatanKinerja:
      'Proyek Flyover Sei Ladi dan Pelebaran Jalan Yos Sudarso berstatus Ahead (+4,2% dan +3,1%). Paket Drainase Sagulung dalam SCM-1 dengan penambahan alat berat.',
    halamanPdf: 'Satu Data Hal. 49-50',
    iconType: 'hardhat',
  },
  'kpi-row-utilitas': {
    code: 'SATU-DATA #1',
    name: 'Rekapitulasi Perizinan Pemanfaatan ROW untuk Penempatan Utilitas',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (DEP-A7-02)',
    datasetSumber: 'Buku Satu Data Hal. 48 (Dataset 1: Perizinan Pemanfaatan ROW)',
    deskripsi:
      'Pencatatan legalitas penempatan utilitas (pipa gas, SPAM air, kabel fiber optik, dan listrik PLN) pada koridor Ruang Milik Jalan (ROW) BP Batam.',
    formula:
      'Total Retribusi ROW = ∑ (Panjang Gelaran (m) × Tarif Retribusi ROW per Meter/Tahun) + Biaya Administrasi',
    tableauCalculation:
      '// Total PNBP ROW Utilitas:\nSUM([TOTAL_RETRIBUSI_UTILITAS])',
    programTargetLabel: '100% Tertib Izin',
    realizationLabel: '12 Izin Resmi (41.250 m)',
    achievement: 100.0,
    status: 'Legalitas Lengkap',
    catatanKinerja:
      '12 perusahaan utilitas resmi memegang izin penempatan dengan total panjang 41.250 meter galian tertib tanpa mengganggu arus lalu lintas.',
    halamanPdf: 'Satu Data Hal. 48',
    iconType: 'utilitas',
  },
  'kpi-row-penghijauan': {
    code: 'SATU-DATA #2',
    name: 'Penataan ROW Penghijauan & Ruang Terbuka Hijau (RTH) Jalan',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (DEP-A7-02)',
    datasetSumber: 'Buku Satu Data Hal. 48 (Dataset 2: ROW Penghijauan)',
    deskripsi:
      'Pengelolaan dan pemeliharaan vegetasi peneduh, bougenville, dan rumput gajah mini pada median dan sempadan jalan protokol Batam.',
    formula:
      'Total Luas RTH Terkelola = ∑ [Luas Median Jalan (m²)] + ∑ [Luas Sempadan Hijau (m²)]',
    tableauCalculation: 'SUM([LUAS_RTH_M2])',
    programTargetLabel: '120.000 m² RTH',
    realizationLabel: '142.500 m² (38 Lokasi)',
    achievement: 118.75,
    status: 'Sangat Baik (Hijau Asri)',
    catatanKinerja:
      'Penataan lansekap median jalan Sudirman dan bandara Hang Nadim terpelihara prima dengan sistem penyiraman otomatis.',
    halamanPdf: 'Satu Data Hal. 48',
    iconType: 'tree',
  },
  'kpi-pematangan': {
    code: 'SATU-DATA #5',
    name: 'Pematangan Tanah (BSW) & Cut and Fill Lahan Kawasan Industri',
    unitPengampu: 'Direktorat Pembangunan Infrastruktur (DEP-A7-02)',
    datasetSumber: 'Buku Satu Data Hal. 50-51 (Dataset 5: Pematangan Lahan BSW)',
    deskripsi:
      'Perataan dan pengurukan tanah pada 5 Wilayah Pengembangan Strategis Batam (BSW) guna penyediaan kavling siap bangun bagi penanaman modal asing (PMA).',
    formula:
      'Rasio Penyelesaian Cut & Fill = ( Realisasi Volume Tanah (m³) / Target Volume Kontrak (m³) ) × 100%',
    tableauCalculation:
      'SUM([VOL_REALISASI_M3]) / SUM([VOL_KONTRAK_M3]) * 100',
    programTargetLabel: '280 Hektar',
    realizationLabel: '4.270.000 m³ (71,3%)',
    achievement: 71.3,
    status: 'Sesuai Tahapan BSW',
    catatanKinerja:
      'BSW Nongsa Digital Park dan Batam Centre telah mencapai progres di atas 80% siap konstruksi pabrik dan data center.',
    halamanPdf: 'Satu Data Hal. 50-51',
    iconType: 'mountain',
  },
  'kpi_bangunan_liar': {
    code: 'DITPAM #9',
    name: 'Penertiban Bangunan Liar & Pengamanan Koridor ROW Aset BP Batam',
    unitPengampu: 'Direktorat Pengamanan Aset dan Kawasan (Ditpam BP Batam)',
    datasetSumber: 'Buku Satu Data Hal. 17-19 (Dataset 9: Penertiban Rutin & Bangunan Liar)',
    deskripsi:
      'Pengamanan aset tanah dan koridor ROW jalan dari okupasi tanpa izin guna menjamin ketersediaan lahan konstruksi proyek infrastruktur Perkin A.7.',
    formula:
      'Persentase Sterilisasi Koridor Proyek = ( Jumlah Unit Ditertibkan / Target Pembersihan ROW ) × 100%',
    tableauCalculation: 'SUM([JUMLAH_BANGUNAN_LIAR_TERTIB])',
    programTargetLabel: '1.000 Unit',
    realizationLabel: '1.030 Unit Ditertibkan',
    achievement: 103.0,
    status: 'Steril & Aman Kondusif',
    catatanKinerja:
      '1.030 unit bangunan liar tanpa izin di koridor pelebaran jalan Sudirman, Duriangkang, Sekupang, dan Rempang ditertibkan secara humanis dengan relokasi kavling.',
    halamanPdf: 'Satu Data Hal. 17-19',
    iconType: 'shield',
  },
  'kpi-ded-perencanaan': {
    code: 'PERENCANAAN #1',
    name: 'Kesiapan Dokumen DED & Readiness Criteria Infrastruktur',
    unitPengampu: 'Direktorat Perencanaan Infrastruktur (DEP-A7-01)',
    datasetSumber: 'Satu Data Hal. 53 (Dataset 1 s.d. 6 Detail Engineering Design)',
    deskripsi:
      'Pengukuran kesiapan dokumen teknis Detail Engineering Design (DED), RAB/HPS, dan AMDAL untuk dilelangkan menjadi paket pekerjaan fisik.',
    formula:
      'Tingkat Utilisasi DED = ( Paket DED Siap Lelang Fisik / Total Paket Perencanaan ) × 100%\n= ( 28 Paket / 43 Paket ) × 100% = 65,12%',
    tableauCalculation:
      'COUNTD(IF [STATUS_KESIAPAN] = "Selesai" THEN [KODE_PAKET] END) / COUNTD([KODE_PAKET]) * 100',
    programTargetLabel: '60,00% Siap Lelang',
    realizationLabel: '28 Paket (65,12%)',
    achievement: 65.12,
    status: 'Melampaui Target',
    catatanKinerja:
      '28 paket DED bernilai estimasi capex fisik Rp 2,42 Triliun telah selesai diaudit BPKP dan siap proses lelang konstruksi e-Katalog LKPP.',
    halamanPdf: 'Satu Data Hal. 53',
    iconType: 'hardhat',
  },
};

export const InfrastrukturPerkinA7FormulaModal: React.FC<
  InfrastrukturPerkinA7FormulaModalProps
> = ({ isOpen, onClose, selectedKpiId }) => {
  if (!isOpen) return null;

  // Resolve active KPI configuration from extended dictionary
  let resolvedKey = selectedKpiId || 'ikp-1-pembangunan-infrastruktur';
  if (!EXTENDED_FORMULA_DICTIONARY[resolvedKey]) {
    // Try matching prefix or alias
    if (resolvedKey.includes('ruas') || resolvedKey.includes('jalan')) {
      resolvedKey = 'kpi-ruas-jalan';
    } else if (resolvedKey.includes('utilitas')) {
      resolvedKey = 'kpi-row-utilitas';
    } else if (resolvedKey.includes('penghijauan')) {
      resolvedKey = 'kpi-row-penghijauan';
    } else if (resolvedKey.includes('pematangan')) {
      resolvedKey = 'kpi-pematangan';
    } else if (resolvedKey.includes('bangunan') || resolvedKey.includes('penertiban')) {
      resolvedKey = 'kpi_bangunan_liar';
    } else if (resolvedKey.includes('kurva') || resolvedKey.includes('progres')) {
      resolvedKey = 'kpi-kurva-s';
    } else if (resolvedKey.includes('ded') || resolvedKey.includes('perencanaan')) {
      resolvedKey = 'kpi-ded-perencanaan';
    } else if (resolvedKey.includes('2') || resolvedKey.includes('pnbp')) {
      resolvedKey = 'ikp-2-pnbp-infrastruktur';
    } else {
      resolvedKey = 'ikp-1-pembangunan-infrastruktur';
    }
  }

  const currentKpi = EXTENDED_FORMULA_DICTIONARY[resolvedKey];

  const renderIcon = () => {
    switch (currentKpi.iconType) {
      case 'coins':
        return <Coins className="w-5 h-5 text-emerald-700" />;
      case 'road':
        return <Route className="w-5 h-5 text-indigo-700" />;
      case 'utilitas':
        return <Zap className="w-5 h-5 text-cyan-700" />;
      case 'tree':
        return <Trees className="w-5 h-5 text-emerald-700" />;
      case 'mountain':
        return <Mountain className="w-5 h-5 text-amber-700" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-blue-700" />;
      default:
        return <HardHat className="w-5 h-5 text-blue-700" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs bg-white border border-slate-200">
              {renderIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                  {currentKpi.code}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {currentKpi.halamanPdf}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                Kamus Rumus &amp; Definisi Operasional: {currentKpi.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Deskripsi Indikator */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold text-slate-400 mb-1">
              Definisi &amp; Deskripsi Indikator
            </h4>
            <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-slate-700">
              {currentKpi.deskripsi}
            </p>
          </div>

          {/* Formula Matematis Resmi */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold text-slate-400 mb-1">
              Formula Matematis Perhitungan
            </h4>
            <div className="bg-slate-900 text-cyan-300 font-mono text-xs sm:text-sm p-3.5 rounded-xl border border-slate-800 shadow-inner whitespace-pre-wrap">
              {currentKpi.formula}
            </div>
          </div>

          {/* Calculated Field Tableau */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold text-slate-400 mb-1">
              Tableau Calculated Field Formula
            </h4>
            <div className="bg-blue-50 border border-blue-200 text-blue-900 font-mono text-xs p-3 rounded-xl whitespace-pre-wrap">
              <code>{currentKpi.tableauCalculation}</code>
            </div>
          </div>

          {/* Komponen Perhitungan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-[10px] font-mono uppercase text-slate-400">Target Acuan</div>
              <div className="text-base font-black font-mono text-slate-900 mt-0.5">
                {currentKpi.programTargetLabel}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Ditetapkan dalam Dokumen Resmi</div>
            </div>

            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <div className="text-[10px] font-mono uppercase text-emerald-600">Realisasi Capaian</div>
              <div className="text-base font-black font-mono text-emerald-700 mt-0.5">
                {currentKpi.realizationLabel} ({currentKpi.achievement.toFixed(2)}%)
              </div>
              <div className="text-[11px] text-emerald-600 mt-1 font-semibold">
                Status: {currentKpi.status}
              </div>
            </div>
          </div>

          {/* Catatan Kinerja Lapangan */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold text-slate-400 mb-1">
              Catatan Kinerja Lapangan &amp; Tindak Lanjut
            </h4>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs leading-relaxed">
              {currentKpi.catatanKinerja}
            </div>
          </div>

          {/* Dokumen Rujukan & Unit Pengampu */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              <strong>Sumber Data:</strong> {currentKpi.datasetSumber}
            </div>
            <div>
              <strong>Unit Pengampu:</strong> {currentKpi.unitPengampu}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Dokumen Perkin No: {PERKIN_A7_METADATA.nomorPerkin}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

