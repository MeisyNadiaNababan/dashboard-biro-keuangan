import React, { useState, useEffect } from 'react';
import { X, FileCode2, Calculator, CheckCircle2, BookOpen, Layers, Sparkles, HelpCircle } from 'lucide-react';

export interface BandaraFormulaInfo {
  key: string;
  title: string;
  datasetNo: number;
  datasetName: string;
  pdfPages: string;
  sifatData: string;
  deskripsi: string;
  atributSatuData: { nama: string; tipe: string; keterangan: string }[];
  formulaMatematis: string;
  formulaTableau: string;
  tableauShelves: {
    rows: string;
    columns: string;
    marks: string;
    filters: string;
  };
  contohHitung: string;
  catatanImplementasi: string;
}

export const BANDARA_FORMULAS: Record<string, BandaraFormulaInfo> = {
  pnbp: {
    key: 'pnbp',
    title: 'KPI Realisasi PNBP Kebandarudaraan',
    datasetNo: 1,
    datasetName: 'DATA REALISASI PENERIMAAN NEGARA BUKAN PAJAK (PNBP)',
    pdfPages: 'Buku Satu Data Hal. 11',
    sifatData: 'Statistik Pertahun | Tertutup (Internal)',
    deskripsi: 'Menghitung total rupiah penerimaan negara bukan pajak yang sah dari jasa kebandarudaraan Hang Nadim (PJP2U, PJP4U, Konsesi Komersial, Garbarata, EMPU Kargo).',
    atributSatuData: [
      { nama: 'JENIS PENERIMAAN', tipe: 'Teks / Dimensi', keterangan: 'Kategori pos pendapatan (PJP2U, PJP4U, EMPU, Sewa Lahan/Gedung)' },
      { nama: 'ANGGARAN PNBP', tipe: 'Numerik / Target', keterangan: 'Target pagu DIPA/RKA BLU BP Batam tahun berjalan' },
      { nama: 'TOTAL IDR', tipe: 'Numerik / Measure', keterangan: 'Realisasi nominal kas masuk yang terverifikasi per jenis penerimaan' },
    ],
    formulaMatematis: '% Capaian PNBP = (Σ Realisasi Total IDR / Σ Target Anggaran PNBP) * 100%',
    formulaTableau: `// Calculated Field 1: [Realisasi PNBP Miliar]
SUM([TOTAL IDR]) / 1000000000

// Calculated Field 2: [% Capaian PNBP]
(SUM([TOTAL IDR]) / SUM([ANGGARAN PNBP])) * 100`,
    tableauShelves: {
      rows: 'SUM([TOTAL IDR]), SUM([ANGGARAN PNBP])',
      columns: '[JENIS PENERIMAAN] atau MONTH([TANGGAL_SETOR])',
      marks: 'Bar Chart (Side-by-side bar atau Dual Axis dengan Line % Capaian)',
      filters: '[TAHUN] = 2026, [JENIS PENERIMAAN] in All',
    },
    contohHitung: 'Target 2026: Rp 285,00 Miliar | Realisasi: Rp 312,45 Miliar | Capaian = (312,45 / 285,00) * 100% = 109,63% (Surplus +Rp 27,45 Miliar)',
    catatanImplementasi: 'Format field di Tableau sebagai Mata Uang Rupiah (IDR) tanpa desimal, atau custom format Rp #,##0.00 "Miliar".',
  },
  flights: {
    key: 'flights',
    title: 'KPI Total Penerbangan (Arus Pesawat Udara)',
    datasetNo: 2,
    datasetName: 'DAFTAR ARUS LALU LINTAS UDARA',
    pdfPages: 'Buku Satu Data Hal. 11',
    sifatData: 'Statistik Pertriwulan | Terbuka',
    deskripsi: 'Menghitung total pergerakan pesawat take-off dan landing (Arrival dan Departure) baik penerbangan berjadwal, perintis, kargo, maupun sewa (charter).',
    atributSatuData: [
      { nama: 'TANGGAL PENERBANGAN', tipe: 'Date', keterangan: 'Waktu pergerakan operasional pesawat' },
      { nama: 'A/D', tipe: 'Dimensi (String)', keterangan: 'Kode pergerakan: A = Arrival (Datang), D = Departure (Berangkat)' },
      { nama: 'JENIS PENERBANGAN', tipe: 'Dimensi (String)', keterangan: 'Klasifikasi Domestik / Internasional' },
      { nama: 'NOMOR PENERBANGAN', tipe: 'String / ID', keterangan: 'Callsign / Flight Number resmi' },
    ],
    formulaMatematis: 'Total Pergerakan Pesawat = COUNT([NOMOR PENERBANGAN]) = Σ Pergerakan Arrival + Σ Pergerakan Departure',
    formulaTableau: `// Calculated Field: [Total Penerbangan]
COUNT([NOMOR PENERBANGAN])

// Calculated Field: [Penerbangan Arrival]
COUNT(IF [A/D] = 'A' THEN [NOMOR PENERBANGAN] END)

// Calculated Field: [Penerbangan Departure]
COUNT(IF [A/D] = 'D' THEN [NOMOR PENERBANGAN] END)`,
    tableauShelves: {
      rows: 'COUNT([NOMOR PENERBANGAN])',
      columns: 'MONTH([TANGGAL PENERBANGAN]), [A/D]',
      marks: 'Stacked Bar Chart atau Line Chart (Color by [A/D])',
      filters: '[JENIS PENERBANGAN] in All',
    },
    contohHitung: 'Arrival: 19.120 + Departure: 19.215 = Total 38.335 Pergerakan Pesawat Udara (Rata-rata 105 pergerakan per hari).',
    catatanImplementasi: 'Di Tableau gunakan COUNTD([NOMOR PENERBANGAN] + STR([TANGGAL PENERBANGAN])) jika data detail per leg pergerakan.',
  },
  passengers: {
    key: 'passengers',
    title: 'KPI Total Penumpang Bandara',
    datasetNo: 2,
    datasetName: 'DAFTAR ARUS LALU LINTAS UDARA (MANIFEST PENUMPANG)',
    pdfPages: 'Buku Satu Data Hal. 11',
    sifatData: 'Statistik Pertriwulan | Terbuka',
    deskripsi: 'Menghitung total volume penumpang yang dilayani di terminal Hang Nadim, mencakup penumpang datang (arrival), berangkat (departure), dan transit.',
    atributSatuData: [
      { nama: 'PENUMPANG DEWASA', tipe: 'Integer', keterangan: 'Jumlah penumpang kategori adult' },
      { nama: 'PENUMPANG ANAK', tipe: 'Integer', keterangan: 'Jumlah penumpang kategori child' },
      { nama: 'PENUMPANG BAYI', tipe: 'Integer', keterangan: 'Jumlah penumpang kategori infant' },
      { nama: 'PNP TRANSIT', tipe: 'Integer', keterangan: 'Total penumpang transit (Dewasa + Anak + Bayi)' },
      { nama: 'A/D', tipe: 'Dimensi', keterangan: 'Arah arus pergerakan' },
    ],
    formulaMatematis: 'Total Pax = Σ [PENUMPANG DEWASA] + Σ [PENUMPANG ANAK] + Σ [PENUMPANG BAYI] + Σ [PNP TRANSIT]',
    formulaTableau: `// Calculated Field 1: [Total Penumpang Bersih]
SUM([PENUMPANG DEWASA]) + SUM([PENUMPANG ANAK]) + SUM([PENUMPANG BAYI]) + SUM([PNP TRANSIT])

// Calculated Field 2: [Penumpang Arrival]
SUM(IF [A/D] = 'A' THEN [PENUMPANG DEWASA] + [PENUMPANG ANAK] + [PENUMPANG BAYI] ELSE 0 END)`,
    tableauShelves: {
      rows: 'SUM([Total Penumpang Bersih])',
      columns: 'MONTH([TANGGAL PENERBANGAN])',
      marks: 'Area Chart atau Line Chart dengan data point circle',
      filters: '[TAHUN] = 2026',
    },
    contohHitung: 'Arrival (2,38 Juta) + Departure (2,41 Juta) + Transit (68 Ribu) = Total 4.862.450 Penumpang per tahun.',
    catatanImplementasi: 'Pisahkan penumpang bayi untuk analisis PJP2U (Passenger Service Charge) karena bayi tidak dikenakan tarif PSC terminal.',
  },
  slf: {
    key: 'slf',
    title: 'Rata-rata Seat Load Factor (SLF %)',
    datasetNo: 2,
    datasetName: 'DAFTAR ARUS LALU LINTAS UDARA (UTILISASI KURSI)',
    pdfPages: 'Buku Satu Data Hal. 11',
    sifatData: 'Indikator Efisiensi Okupansi Penerbangan',
    deskripsi: 'Seat Load Factor (SLF) mengukur persentase tingkat keterisian kursi pesawat udara dari total kapasitas kursi yang disediakan maskapai penerbangan.',
    atributSatuData: [
      { nama: 'KAPASITAS KURSI', tipe: 'Integer', keterangan: 'Kapasitas seat terpasang pada tipe pesawat (A320 = 180 seat, B738 = 189 seat)' },
      { nama: 'PENUMPANG DEWASA + ANAK', tipe: 'Integer', keterangan: 'Jumlah penumpang yang menempati kursi berbayar' },
      { nama: 'OPERATOR', tipe: 'Dimensi', keterangan: 'Nama maskapai penerbangan' },
      { nama: 'ASL / TJN', tipe: 'Dimensi', keterangan: 'Rute trayek penerbangan' },
    ],
    formulaMatematis: 'Seat Load Factor (SLF %) = (Σ [Total Penumpang Duduk] / Σ [Total Kapasitas Kursi Tersedia]) * 100%',
    formulaTableau: `// Calculated Field: [Seat Load Factor %]
( (SUM([PENUMPANG DEWASA]) + SUM([PENUMPANG ANAK])) / SUM([KAPASITAS KURSI]) ) * 100`,
    tableauShelves: {
      rows: '[OPERATOR] atau [RUTE TRAYEK]',
      columns: '[Seat Load Factor %]',
      marks: 'Horizontal Bar Chart dengan Reference Line pada 75% (Target Minimum BEP Maskapai)',
      filters: 'SUM([KAPASITAS KURSI]) > 0',
    },
    contohHitung: 'Total Penumpang Duduk: 4.020.000 seat / Total Kapasitas Kursi Disediakan: 4.981.400 seat * 100% = 80,7% (Sangat Sehat, di atas BEP 70-75%).',
    catatanImplementasi: 'Tambahkan Color Palette: Hijau untuk SLF >= 80%, Kuning untuk 70-79%, Merah untuk < 70%.',
  },
  operator_share: {
    key: 'operator_share',
    title: 'Pangsa Pasar & Pergerakan Maskapai (%)',
    datasetNo: 10,
    datasetName: 'DAFTAR OPERATOR PENERBANGAN',
    pdfPages: 'Buku Satu Data Hal. 12',
    sifatData: 'Statistik Tahunan & SIUP | Terbuka',
    deskripsi: 'Menghitung proporsi kontribusi penerbangan dari masing-masing maskapai penerbangan terhadap total keseluruhan pergerakan di Bandara Hang Nadim.',
    atributSatuData: [
      { nama: 'NAMA PERUSAHAAN / OPERATOR', tipe: 'String', keterangan: 'Nama legal maskapai (Lion Air, Citilink, Garuda Indonesia, dll)' },
      { nama: 'NOMOR SIUP', tipe: 'String', keterangan: 'Izin Usaha Angkutan Udara Niaga Berjadwal / Tidak Berjadwal' },
      { nama: 'JUMLAH PENERBANGAN', tipe: 'Integer', keterangan: 'Frekuensi pergerakan pesawat dalam periode audit' },
    ],
    formulaMatematis: 'Market Share (%) = (Σ Penerbangan Maskapai / Total Penerbangan Seluruh Maskapai) * 100%',
    formulaTableau: `// Calculated Field: [% Share Penerbangan]
SUM([JUMLAH PENERBANGAN]) / TOTAL(SUM([JUMLAH PENERBANGAN])) * 100`,
    tableauShelves: {
      rows: 'SUM([JUMLAH PENERBANGAN])',
      columns: '[NAMA OPERATOR]',
      marks: 'Lollipop Chart atau Treemap (Size: [Penerbangan], Color: [Kategori Maskapai])',
      filters: '[TAHUN] = 2026',
    },
    contohHitung: 'Lion Air (12.450 flights) / Total Seluruh Maskapai (38.335 flights) * 100% = 32,48% Market Leader.',
    catatanImplementasi: 'Gunakan Tableau Quick Table Calculation: Percent of Total pada SUM([JUMLAH PENERBANGAN]).',
  },
  routes: {
    key: 'routes',
    title: 'Frekuensi Rute Langsung & Kepadatan Trayek',
    datasetNo: 9,
    datasetName: 'DATA PENERBANGAN LANGSUNG (RUTE ASAL - TUJUAN)',
    pdfPages: 'Buku Satu Data Hal. 12',
    sifatData: 'Statistik Penerbangan | Terbuka',
    deskripsi: 'Menghitung volume traffic, frekuensi mingguan, dan kepadatan arus penumpang pada rute point-to-point langsung dari/ke Hang Nadim.',
    atributSatuData: [
      { nama: 'ASL (Asal)', tipe: 'String (IATA Code)', keterangan: 'Bandara keberangkatan (BTH untuk outbound)' },
      { nama: 'TJN (Tujuan)', tipe: 'String (IATA Code)', keterangan: 'Bandara tujuan penerbangan (CGK, SUB, KNO, PKU, dll)' },
      { nama: 'FREKUENSI PENERBANGAN', tipe: 'Integer', keterangan: 'Jumlah penerbangan terjadwal per minggu/bulan' },
      { nama: 'TOTAL PENUMPANG RUTE', tipe: 'Integer', keterangan: 'Akumulasi arus penumpang yang diangkut' },
    ],
    formulaMatematis: 'Rata-rata Frekuensi Harian = Frekuensi Mingguan / 7 Hari',
    formulaTableau: `// Calculated Field: [Frekuensi Harian]
SUM([FREKUENSI_MINGGUAN]) / 7

// Calculated Field: [Estimasi Pax Per Penerbangan]
SUM([TOTAL_PENUMPANG_RUTE]) / (SUM([FREKUENSI_MINGGUAN]) * 52)`,
    tableauShelves: {
      rows: '[RUTE TRAYEK] (Sorted descending by [FREKUENSI_MINGGUAN])',
      columns: 'SUM([FREKUENSI_MINGGUAN])',
      marks: 'Horizontal Bar Chart dengan Label Angka Frekuensi di ujung bar',
      filters: 'Top 10 Rute by SUM([FREKUENSI_MINGGUAN])',
    },
    contohHitung: 'Rute BTH - CGK: 112 penerbangan/minggu = ~16 penerbangan/hari (Trayek tersibuk dengan 1,42 Juta penumpang per tahun).',
    catatanImplementasi: 'Bisa dipadukan dengan Map Visualisasi Origin-Destination (Spider Map) di Tableau.',
  },
  cargo: {
    key: 'cargo',
    title: 'Volume Logistik Kargo Udara (EMPU)',
    datasetNo: 5,
    datasetName: 'DATA EKSPEDISI MUATAN PESAWAT UDARA (EMPU / KARGO)',
    pdfPages: 'Buku Satu Data Hal. 11',
    sifatData: 'Statistik Operasional Logistik | Terbuka',
    deskripsi: 'Menghitung tonase muatan kargo inbound dan outbound yang ditangani oleh perusahaan jasa pengurusan transportasi (EMPU) di terminal kargo Hang Nadim.',
    atributSatuData: [
      { nama: 'KARGO MASUK (KG)', tipe: 'Numerik (Kg)', keterangan: 'Berat muatan kargo kedatangan' },
      { nama: 'KARGO KELUAR (KG)', tipe: 'Numerik (Kg)', keterangan: 'Berat muatan kargo keberangkatan' },
      { nama: 'PERUSAHAAN EMPU', tipe: 'Dimensi', keterangan: 'Nama agen kargo / ekspedisi terdaftar' },
    ],
    formulaMatematis: 'Total Tonase Kargo = (Σ [KARGO MASUK] + Σ [KARGO KELUAR]) / 1.000 Kg',
    formulaTableau: `// Calculated Field: [Total Kargo Ton]
(SUM([KARGO MASUK KG]) + SUM([KARGO KELUAR KG])) / 1000`,
    tableauShelves: {
      rows: 'SUM([Total Kargo Ton])',
      columns: 'MONTH([TANGGAL])',
      marks: 'Stacked Bar Chart (Inbound vs Outbound)',
      filters: '[TAHUN] = 2026',
    },
    contohHitung: 'Kargo Inbound (24.200 Ton) + Kargo Outbound (22.350 Ton) = Total 46.550 Ton Kargo Udara per tahun.',
    catatanImplementasi: 'Berguna untuk analisis Utilisasi Terminal Kargo dan pendapatan jasa EMPU.',
  },
};

interface BandaraFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKey?: string | number;
}

export const BandaraFormulaModal: React.FC<BandaraFormulaModalProps> = ({
  isOpen,
  onClose,
  initialKey = 'pnbp',
}) => {
  // Convert number to string key if passed as dataset number
  const resolveKey = (val: string | number): string => {
    if (typeof val === 'number') {
      if (val === 1) return 'pnbp';
      if (val === 2) return 'flights';
      if (val === 5) return 'cargo';
      if (val === 9) return 'routes';
      if (val === 10) return 'operator_share';
      return 'pnbp';
    }
    return val;
  };

  const [activeKey, setActiveKey] = useState<string>(resolveKey(initialKey));

  useEffect(() => {
    if (isOpen && initialKey) {
      setActiveKey(resolveKey(initialKey));
    }
  }, [isOpen, initialKey]);

  if (!isOpen) return null;

  const current = BANDARA_FORMULAS[activeKey] || BANDARA_FORMULAS.pnbp;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Formula Perhitungan &amp; Atribut Data Kebandarudaraan
              </h3>
              <p className="text-xs text-slate-500">
                Panduan Implementasi Tableau &amp; Definisi Resmi Buku Satu Data BP Batam (Hal. 11 - 12)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* METRIC PILL SELECTORS */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-6 py-2 gap-1.5 overflow-x-auto text-xs">
          {Object.values(BANDARA_FORMULAS).map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all shrink-0 cursor-pointer whitespace-nowrap ${
                activeKey === item.key
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* BANNER CARD */}
          <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-sky-200 text-sky-900 rounded font-bold text-[10px] uppercase">
                  Dataset No. {current.datasetNo}
                </span>
                <span className="text-[11px] font-semibold text-sky-800">
                  {current.pdfPages}
                </span>
                <span className="text-[10px] text-slate-500 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                  {current.sifatData}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{current.datasetName}</h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{current.deskripsi}</p>
            </div>
          </div>

          {/* ATRIBUT DATA RESMI TABLE */}
          <div>
            <h5 className="font-bold text-slate-800 text-xs mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              Atribut Data yang Digunakan (Sesuai Buku Satu Data BP Batam)
            </h5>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2 px-3 border-r border-slate-200">Nama Field Atribut</th>
                    <th className="py-2 px-3 border-r border-slate-200">Tipe Data</th>
                    <th className="py-2 px-3">Penjelasan &amp; Makna Operasional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white font-mono text-[11px]">
                  {current.atributSatuData.map((attr, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-bold text-sky-900 border-r border-slate-200">{attr.nama}</td>
                      <td className="py-2 px-3 text-slate-600 border-r border-slate-200">{attr.tipe}</td>
                      <td className="py-2 px-3 text-slate-700 font-sans">{attr.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DUA KOTAK FORMULA: MATEMATIS & TABLEAU CODE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. RUMUS MATEMATIS */}
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-emerald-400 font-bold mb-2 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Calculator className="w-3.5 h-3.5" />
                    FORMULA MATEMATIS OPERASIONAL:
                  </span>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-amber-300 font-bold leading-relaxed">
                  {current.formulaMatematis}
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-400 border-t border-slate-800 pt-2 font-sans">
                {current.contohHitung}
              </div>
            </div>

            {/* 2. TABLEAU CALCULATED FIELD */}
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-sky-400 font-bold mb-2 text-[11px]">
                  <span className="flex items-center gap-1">
                    <FileCode2 className="w-3.5 h-3.5" />
                    SINTAKS CALCULATED FIELD DI TABLEAU:
                  </span>
                </div>
                <pre className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-sky-300 text-[11px] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {current.formulaTableau}
                </pre>
              </div>
              <div className="mt-3 text-[10px] text-slate-400 border-t border-slate-800 pt-2 font-sans">
                {current.catatanImplementasi}
              </div>
            </div>
          </div>

          {/* TABLEAU SHELVES CONFIGURATION GUIDE */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h5 className="font-bold text-slate-800 text-xs mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Konfigurasi Shelves di Tableau Worksheet
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px]">
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Rows (Baris)</span>
                <p className="font-mono text-sky-900 font-semibold mt-0.5">{current.tableauShelves.rows}</p>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Columns (Kolom)</span>
                <p className="font-mono text-sky-900 font-semibold mt-0.5">{current.tableauShelves.columns}</p>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Marks (Tipe Visual)</span>
                <p className="font-medium text-slate-800 mt-0.5">{current.tableauShelves.marks}</p>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Filters (Penyaring)</span>
                <p className="font-medium text-slate-800 mt-0.5">{current.tableauShelves.filters}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Dapat langsung disalin (*copy-paste*) ke Calculated Field Tableau Desktop / Creator.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
