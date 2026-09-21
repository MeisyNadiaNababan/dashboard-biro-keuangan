import React from 'react';
import { X, HelpCircle, BookOpen, Layers, CheckCircle2, Shield } from 'lucide-react';

interface PengamananFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKpiId?: string | null;
}

interface FormulaItem {
  id: string;
  title: string;
  datasetNo: string;
  definisi: string;
  formulaMatematis: string;
  tableauCalculatedField: string;
  sumberData: string;
}

const FORMULAS: FormulaItem[] = [
  {
    id: 'kpi_bangunan_liar',
    title: 'Jumlah Penerbitan / Penertiban Bangunan Liar',
    datasetNo: 'Dataset No. 1 (Hal. 17)',
    definisi: 'Akumulasi seluruh objek bangunan liar dan pekerja ilegal yang diverifikasi faktual dan ditertibkan oleh Tim Direktorat Pengamanan BP Batam.',
    formulaMatematis: 'Total Penerbitan Bangunan Liar = ∑ (Jumlah Bangunan Liar Ditertibkan Lapangan)',
    tableauCalculatedField: `// Formula Tableau Desktop
COUNTD([_id])
// Atau Sum Bangunan Ditertibkan:
SUM(IF [STATUSPENERTIBAN] = 'Ditertibkan' THEN [JUMLAH] ELSE 0 END)`,
    sumberData: 'Buku Satu Data Hal. 17 - Tabel pekerja-liar (1.030 Entri Terdata)',
  },
  {
    id: 'kpi_personil',
    title: 'Jumlah Personil Pengamanan Ditpam BP Batam',
    datasetNo: 'Dataset No. 3 (Hal. 17)',
    definisi: 'Kekuatan riil personil terlatih Ditpam BP Batam yang aktif bertugas dalam 4 Subdirektorat pengamanan.',
    formulaMatematis: 'Total Personil = Personil Hutan & DAS + Personil Obvit & Aset + Personil Penindakan + Tim Rescue & Damkar',
    tableauCalculatedField: `// Formula Tableau Desktop
SUM([JUMLAH_PERSONIL])
// Persentase Kesiapsiagaan Operasi:
AVG([PERSENTASE_KESIAPAN])`,
    sumberData: 'Buku Satu Data Hal. 17 - Rekap Kekuatan Personel Ditpam BP Batam (684 Personil)',
  },
  {
    id: 'kpi_total_pengamanan',
    title: 'Total Pengamanan Lingkungan, Hutan, Aset dan Objek Vital',
    datasetNo: 'Dataset No. 12 (Hal. 19)',
    definisi: 'Jumlah kumulatif seluruh kegiatan pengamanan fisik, patroli rutin harian, dan posko penjagaan pada kawasan hutan lindung, DTA waduk air baku, dan objek vital strategis BP Batam.',
    formulaMatematis: 'Total Pengamanan = ∑ (Kegiatan Patroli Rutin) + ∑ (Pengamanan Posko Objek Vital)',
    tableauCalculatedField: `// Formula Tableau Desktop
SUM([TOTAL_KEGIATAN_PENGAMANAN])`,
    sumberData: 'Buku Satu Data Hal. 19 - Rekapitulasi Pengamanan Objek Vital & Hutan (4.820 Kegiatan)',
  },
  {
    id: 'kpi_luas_penindakan',
    title: 'Luas Data Penindakan Kawasan Aset dan Objek Vital',
    datasetNo: 'Dataset No. 10 (Hal. 19)',
    definisi: 'Luasan wilayah aset BP Batam, buffer zone waduk air baku, dan koridor ROW jalan yang berhasil disterilisasi dan dikembalikan fungsi peruntukannya.',
    formulaMatematis: 'Luas Penindakan (Hektar) = ∑ Luas Penindakan Kawasan Aset (Ha)',
    tableauCalculatedField: `// Formula Tableau Desktop
SUM([LUAS_PENINDAKAN_HA])
// Konversi ke Meter Persegi:
SUM([LUAS_PENINDAKAN_HA]) * 10000`,
    sumberData: 'Buku Satu Data Hal. 19 - Luas Data Penindakan Kawasan Aset (348,5 Ha / 3.485.000 m²)',
  },
  {
    id: 'kpi_unjuk_rasa',
    title: 'Rekap Pengamanan Unjuk Rasa',
    datasetNo: 'Dataset No. 7 (Hal. 18)',
    definisi: 'Rekapitulasi riwayat penanganan dan pengamanan aksi penyampaian pendapat di muka umum oleh aliansi masyarakat.',
    formulaMatematis: 'Total Personil Giat Unjuk Rasa = ∑ (Jumlah Personil Ditpam per Aksi)',
    tableauCalculatedField: `// Formula Tableau Desktop
SUM([JUMLAH_PERSONIL])
// Rata-rata Personil per Giat:
AVG([JUMLAH_PERSONIL])`,
    sumberData: 'Buku Satu Data Hal. 18 - Tabel unjuk-rasa (35 Entri Lengkap)',
  },
  {
    id: 'kpi_bencana_alam',
    title: 'Rekap Kejadian Bencana Alam',
    datasetNo: 'Dataset No. 6 (Hal. 18)',
    definisi: 'Rekapitulasi kejadian bencana alam (pohon tumbang, karhutla, longsor lereng waduk, genangan air) yang ditanggulangi oleh Tim Rescue Ditpam.',
    formulaMatematis: 'Total Bencana Ditangani = ∑ (Jumlah Kejadian per Jenis Kegiatan Penanggulangan)',
    tableauCalculatedField: `// Formula Tableau Desktop
SUM([JUMLAH])`,
    sumberData: 'Buku Satu Data Hal. 18 - Rekap Bencana Alam Ditpam (158 Kejadian)',
  },
  {
    id: 'kpi_penertiban_rutin',
    title: 'Rekap Data Kegiatan Penertiban Rutin Tim Terpadu',
    datasetNo: 'Dataset No. 9 (Hal. 18)',
    definisi: 'Data kegiatan operasional rutin tim terpadu Ditpam dalam menertibkan pelanggaran peruntukan lahan, waduk, dan lingkungan.',
    formulaMatematis: 'Total Operasi Penertiban = COUNTD([_id]) Kegiatan',
    tableauCalculatedField: `// Formula Tableau Desktop
COUNTD([_id])
// Total Objek Ditertibkan:
SUM([JUMLAH])`,
    sumberData: 'Buku Satu Data Hal. 18 - Tabel penertiban-bp (604 Entri Lengkap)',
  },
];

export const PengamananFormulaModal: React.FC<PengamananFormulaModalProps> = ({
  isOpen,
  onClose,
  initialKpiId,
}) => {
  const [selectedId, setSelectedId] = React.useState<string>(initialKpiId || 'kpi_bangunan_liar');

  React.useEffect(() => {
    if (initialKpiId) {
      setSelectedId(initialKpiId);
    }
  }, [initialKpiId]);

  if (!isOpen) return null;

  const currentFormula = FORMULAS.find((f) => f.id === selectedId) || FORMULAS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-800">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Kamus Rumus &amp; Panduan Tableau Satu Data Ditpam
              </h3>
              <p className="text-[11px] text-slate-500">
                Direktorat Pengamanan Aset dan Kawasan (Buku Satu Data Hal. 17 - 19)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Formula Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
            {FORMULAS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedId === item.id
                    ? 'bg-slate-900 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item.datasetNo.split(' ')[0]} {item.datasetNo.split(' ')[1]}: {item.title.substring(0, 24)}...
              </button>
            ))}
          </div>

          {/* Active Formula Content */}
          <div className="space-y-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                  {currentFormula.datasetNo}
                </span>
                <h4 className="text-base font-bold text-slate-900">{currentFormula.title}</h4>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {currentFormula.definisi}
              </p>
            </div>

            {/* Rumus Matematis */}
            <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 space-y-1">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                Formula Matematis Standar BP Batam
              </span>
              <div className="font-mono text-xs font-semibold text-slate-900 bg-white p-2.5 rounded border border-slate-200">
                {currentFormula.formulaMatematis}
              </div>
            </div>

            {/* Calculated Field Tableau Desktop */}
            <div className="bg-slate-900 text-slate-100 rounded-lg p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>Calculated Field Tableau Desktop</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Tableau Ready</span>
              </div>
              <pre className="font-mono text-xs text-sky-300 bg-slate-950/80 p-3 rounded overflow-x-auto leading-relaxed border border-slate-800">
                {currentFormula.tableauCalculatedField}
              </pre>
            </div>

            {/* Sumber Data & Verifikasi */}
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Sumber Data Rujukan:</span>
                <span>{currentFormula.sumberData}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
