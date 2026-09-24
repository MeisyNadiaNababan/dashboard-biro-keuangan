import React, { useState, useMemo } from 'react';
import {
  Scale,
  Gavel,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  FileCode2,
  Download,
  Search,
  Filter,
  Layers,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw,
  FolderOpen,
  FileCheck2,
  HelpCircle,
  Info,
  Clock,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  KEGIATAN_PENANGANAN_PERKARA,
  DATASET_LITIGASI_PERKARA,
  DATASET_NON_LITIGASI,
  TEMA_PERKARA_AGREGAT,
  JDIHN_PERFORMANCE_DATA,
  DAFTAR_PRODUK_HUKUM,
  DATA_KAJIAN_PENDAMPINGAN,
  BIRO_HUKUM_10_DATASETS,
  KegiatanPerkaraItem,
} from '../../data/hukumData';

interface BiroHukumDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
}

const COLORS = ['#1E40AF', '#0D9488', '#E15759', '#F59E0B', '#8B5CF6', '#EC4899', '#64748B'];

export const BiroHukumDashboard: React.FC<BiroHukumDashboardProps> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
}) => {
  // -------------------------------------------------------------------
  // FILTERS STATE (Requirement #8: Filter yang cocok untuk dashboard ini)
  // -------------------------------------------------------------------
  const [selectedTahun, setSelectedTahun] = useState<string>('all');
  const [selectedJalur, setSelectedJalur] = useState<string>('all'); // all, litigasi, non_litigasi
  const [selectedKlaster, setSelectedKlaster] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [copiedDoc, setCopiedDoc] = useState<boolean>(false);
  const [selectedPerkaraModal, setSelectedPerkaraModal] = useState<KegiatanPerkaraItem | null>(null);

  // Active Sub Tab
  const [currentTab, setCurrentTab] = useState<string>(activeSubTab);

  React.useEffect(() => {
    if (activeSubTab) {
      setCurrentTab(activeSubTab);
    }
  }, [activeSubTab]);

  // -------------------------------------------------------------------
  // FILTERING LOGIC
  // -------------------------------------------------------------------
  const filteredKegiatanPerkara = useMemo(() => {
    return KEGIATAN_PENANGANAN_PERKARA.filter((item) => {
      const matchTahun = selectedTahun === 'all' || item.tahun.toString() === selectedTahun;
      const matchKlaster = selectedKlaster === 'all' || item.klasifikasi.toLowerCase().includes(selectedKlaster.toLowerCase());
      const matchStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'selesai' && item.status.includes('Selesai')) ||
        (selectedStatus === 'proses' && item.status.includes('Dalam Proses')) ||
        (selectedStatus === 'mediasi' && item.status.includes('Mediasi'));
      const matchSearch =
        !searchKeyword ||
        item.tentang.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.nomorPerkara.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.instansiPengadilan.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchTahun && matchKlaster && matchStatus && matchSearch;
    });
  }, [selectedTahun, selectedKlaster, selectedStatus, searchKeyword]);

  const filteredLitigasi = useMemo(() => {
    return DATASET_LITIGASI_PERKARA.filter((item) => {
      const matchTahun = selectedTahun === 'all' || item.tahun.toString() === selectedTahun;
      const matchSearch = !searchKeyword || item.tentang.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchTahun && matchSearch;
    });
  }, [selectedTahun, searchKeyword]);

  const filteredNonLitigasi = useMemo(() => {
    return DATASET_NON_LITIGASI.filter((item) => {
      const matchTahun = selectedTahun === 'all' || item.tahun.toString() === selectedTahun;
      const matchSearch = !searchKeyword || item.tentang.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchTahun && matchSearch;
    });
  }, [selectedTahun, searchKeyword]);

  const filteredTemaAgregat = useMemo(() => {
    return TEMA_PERKARA_AGREGAT.filter((item) => {
      const matchKlaster = selectedKlaster === 'all' || item.klusterBidang.toLowerCase().includes(selectedKlaster.toLowerCase());
      const matchSearch = !searchKeyword || item.tentang.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchKlaster && matchSearch;
    });
  }, [selectedKlaster, searchKeyword]);

  // -------------------------------------------------------------------
  // KPI CALCULATIONS
  // -------------------------------------------------------------------
  // 1. KPI Jumlah Penanganan Perkara (Dataset #4)
  const totalKasusPerkara = filteredKegiatanPerkara.length;
  const totalDokumenPerkara = filteredKegiatanPerkara.reduce((acc, curr) => acc + curr.jumlahDokumen, 0);

  // 2. KPI Penilaian Kerja JDIHN-se Indonesia
  const skorJdihn = JDIHN_PERFORMANCE_DATA.skorTotal; // 100

  // 3. KPI % Penanganan Perkara yang Diselesaikan (Litigasi - Dataset #9)
  const avgSelesaiLitigasi = useMemo(() => {
    if (filteredLitigasi.length === 0) return 0;
    const sum = filteredLitigasi.reduce((acc, curr) => acc + curr.persentaseSelesai, 0);
    return Math.round(sum / filteredLitigasi.length);
  }, [filteredLitigasi]);

  // 4. KPI % Pelayanan & Penanganan Permasalahan Non-Litigasi (Dataset #10)
  const avgPelayananNonLitigasi = useMemo(() => {
    if (filteredNonLitigasi.length === 0) return 0;
    const sum = filteredNonLitigasi.reduce((acc, curr) => acc + curr.persentasePelayanan, 0);
    return Math.round((sum / filteredNonLitigasi.length) * 10) / 10;
  }, [filteredNonLitigasi]);

  // Total Nilai Aset / Keuangan Negara yang Diselamatkan / Dimatangkan
  const totalAsetMitigasiMiliar = useMemo(() => {
    return filteredKegiatanPerkara.reduce((acc, curr) => acc + curr.mitigasiNilaiSengketaMiliar, 0);
  }, [filteredKegiatanPerkara]);

  // Aggregated total kasus across all identical themes
  const totalAgregatLitigasi = filteredTemaAgregat.reduce((acc, curr) => acc + curr.jumlahLitigasi, 0);
  const totalAgregatNonLitigasi = filteredTemaAgregat.reduce((acc, curr) => acc + curr.jumlahNonLitigasi, 0);
  const grandTotalAgregat = totalAgregatLitigasi + totalAgregatNonLitigasi;

  // Monthly document distribution for Kegiatan Penanganan Perkara chart
  const documentMonthlyDistribution = [
    { bulan: 'Jan 26', perkara: 2, dokumen: 44, litigasi: 2, nonLit: 3 },
    { bulan: 'Feb 26', perkara: 2, dokumen: 33, litigasi: 2, nonLit: 2 },
    { bulan: 'Mar 26', perkara: 1, dokumen: 24, litigasi: 1, nonLit: 1 },
    { bulan: 'Nov 25', perkara: 1, dokumen: 16, litigasi: 1, nonLit: 1 },
    { bulan: 'Okt 25', perkara: 1, dokumen: 21, litigasi: 1, nonLit: 1 },
    { bulan: 'Agt 25', perkara: 1, dokumen: 14, litigasi: 1, nonLit: 0 },
    { bulan: 'Jun 25', perkara: 1, dokumen: 26, litigasi: 1, nonLit: 1 },
    { bulan: 'Apr 25', perkara: 1, dokumen: 38, litigasi: 1, nonLit: 0 },
  ];

  // Pie Data: Klasifikasi Kasus
  const klasifikasiPerkaraPie = [
    { name: 'Perdata Pertanahan/HPL', value: 5, color: '#1E40AF' },
    { name: 'Tata Usaha Negara (TUN)', value: 2, color: '#0D9488' },
    { name: 'Arbitrase & KSO', value: 1, color: '#F59E0B' },
    { name: 'Ketenagakerjaan (PHI)', value: 1, color: '#8B5CF6' },
    { name: 'Pidana Khusus BMN', value: 1, color: '#E15759' },
  ];

  const handleCopyDoc = () => {
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2500);
  };

  const handleDownloadDoc = () => {
    const element = document.createElement('a');
    const file = new Blob([generateDocxContent()], { type: 'application/msword;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Laporan_Eksekutif_Biro_Hukum_BP_Batam_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateDocxContent = () => {
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Laporan Eksekutif Biro Hukum BP Batam</title>
      <style>
        body { font-family: 'Calibri', Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #1E293B; }
        h1 { font-size: 16pt; color: #0F1E36; text-align: center; font-weight: bold; border-bottom: 2px solid #0F1E36; padding-bottom: 6px; }
        h2 { font-size: 13pt; color: #1E3A8A; margin-top: 16px; border-bottom: 1px solid #CBD5E1; padding-bottom: 3px; }
        table { border-collapse: collapse; width: 100%; margin-top: 8px; margin-bottom: 12px; }
        th { background-color: #0F1E36; color: #FFFFFF; font-weight: bold; padding: 6px; border: 1px solid #94A3B8; text-align: left; }
        td { padding: 6px; border: 1px solid #CBD5E1; }
        .score-box { background: #ECFDF5; border: 2px solid #10B981; padding: 10px; text-align: center; font-weight: bold; font-size: 14pt; color: #065F46; }
      </style>
      </head>
      <body>
        <h1>BADAN PENGUSAHAAN BATAM (BP BATAM)</h1>
        <p style="text-align: center; margin-top: -6px; font-weight: bold; color: #475569;">BIRO HUKUM - LAPORAN KINERJA & PENYELESAIAN PERKARA</p>
        <p style="text-align: center; font-size: 9pt; color: #64748B;">Dicetak dari Executive Command Center Satu Data BP Batam • ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <h2>1. RINGKASAN KPI UTAMA BIRO HUKUM</h2>
        <table>
          <tr><th>Indikator Kinerja Utama</th><th>Dataset Rujukan</th><th>Target</th><th>Realisasi / Capaian</th><th>Status</th></tr>
          <tr><td>Jumlah Penanganan Perkara</td><td>Dataset No. 4 (Hal. 2)</td><td>Monitoring Penuh</td><td>${totalKasusPerkara} Perkara Aktif (${totalDokumenPerkara} Dokumen)</td><td>Terkendali</td></tr>
          <tr><td>Penilaian Kerja JDIHN Se-Indonesia</td><td>Penilaian Nasional Kemenkumham</td><td>100 Poin</td><td>100 (Nilai Sempurna)</td><td>Terbaik Nasional</td></tr>
          <tr><td>% Penanganan Perkara yang Diselesaikan (Litigasi)</td><td>Dataset No. 9 (Hal. 2)</td><td>&ge; 85%</td><td>${avgSelesaiLitigasi}% Inkracht / Selesai</td><td>Tercapai</td></tr>
          <tr><td>% Pelayanan Permasalahan Hukum (Non-Litigasi)</td><td>Dataset No. 10 (Hal. 2)</td><td>&ge; 90%</td><td>${avgPelayananNonLitigasi}% Layanan Tuntas</td><td>Sangat Baik</td></tr>
          <tr><td>Potensi Nilai Aset/Keuangan Negara Diselamatkan</td><td>Mitigasi Risiko Litigasi</td><td>Maksimal Proteksi</td><td>Rp ${totalAsetMitigasiMiliar.toFixed(1)} Miliar</td><td>Optimal</td></tr>
        </table>

        <h2>2. PENILAIAN JDIHN KEMENKUMHAM RI (SKOR: 100)</h2>
        <div class="score-box">PREDIKAT: ANGGOTA JDIHN TERBAIK NASIONAL (SKOR 100 / 100)</div>
        <p>Penilaian resmi Kementerian Hukum dan HAM Republik Indonesia atas pemenuhan 5 pilar utama Jaringan Dokumentasi dan Informasi Hukum Nasional.</p>

        <h2>3. FORMULA AGREGASI PENANGANAN PERKARA (LITIGASI + NON-LITIGASI)</h2>
        <p><strong>Formula:</strong> <code>Total Kasus = SUM(Perkara Litigasi [Dataset 9]) + SUM(Perkara Non-Litigasi [Dataset 10])</code> per kesamaan tema perkara.</p>
        <table>
          <tr><th>Tentang / Pokok Perkara</th><th>Kluster Bidang</th><th>Litigasi (No. 9)</th><th>Non-Litigasi (No. 10)</th><th>Total Kasus</th><th>Tingkat Sukses</th></tr>
          ${TEMA_PERKARA_AGREGAT.map(
            (t) =>
              `<tr><td>${t.tentang}</td><td>${t.klusterBidang}</td><td>${t.jumlahLitigasi}</td><td>${t.jumlahNonLitigasi}</td><td><strong>${t.totalPenanganan}</strong></td><td>${t.tingkatKeberhasilanPersen}%</td></tr>`
          ).join('')}
        </table>

        <h2>4. KEGIATAN PENANGANAN PERKARA AKTIF (DATASET NO. 4)</h2>
        <table>
          <tr><th>No. Perkara</th><th>Tanggal</th><th>Tentang</th><th>Instansi / Pengadilan</th><th>Dokumen</th><th>Status</th></tr>
          ${KEGIATAN_PENANGANAN_PERKARA.map(
            (k) =>
              `<tr><td>${k.nomorPerkara}</td><td>${k.tanggal}</td><td>${k.tentang}</td><td>${k.instansiPengadilan}</td><td>${k.jumlahDokumen} berkas</td><td>${k.status}</td></tr>`
          ).join('')}
        </table>
      </body>
      </html>
    `;
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-[#F8FAFC] text-slate-800 font-sans overflow-y-auto">
      {/* --------------------------------------------------------------- */}
      {/* 1. TOP EXECUTIVE BANNER: BIRO HUKUM BP BATAM                    */}
      {/* --------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-[#0B1728] via-[#0F223D] to-[#162F56] text-white px-4 sm:px-6 py-3.5 border-b border-[#1E3A8A]/40 shadow-xs shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md ring-2 ring-amber-400/40 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  BIRO HUKUM BP BATAM
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-500/20 text-amber-300 border border-amber-400/50 flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Status: On Progress
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Satu Data Hal. 2
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Award className="w-3 h-3 text-emerald-300" />
                  JDIHN Terbaik Nasional: 100
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Dashboard Eksekutif Penanganan Perkara (Litigasi &amp; Non-Litigasi), Kepatuhan Regulasi, dan Penilaian JDIHN Kemenkumham RI
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentTab('kpi_word_doc')}
              className="px-3 py-1.5 rounded-lg bg-[#1F3864] hover:bg-[#2A4D7D] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-blue-400/30 shadow-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-blue-300" />
              <span>Dokumen Word (.doc)</span>
            </button>
            <button
              onClick={() => setCurrentTab('kamus_rumus')}
              className="px-3 py-1.5 rounded-lg bg-[#132742] hover:bg-[#1A3559] text-sky-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-sky-400/30 shadow-xs cursor-pointer"
            >
              <FileCode2 className="w-3.5 h-3.5 text-sky-300" />
              <span>10 Dataset &amp; Kamus Rumus</span>
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-1 mt-3 overflow-x-auto no-scrollbar border-t border-[#1E3A8A]/50 pt-2.5 text-xs">
          {[
            { id: 'ikhtisar', label: 'Ikhtisar 4 KPI & Executive Summary', icon: Layers },
            { id: 'kegiatan_perkara', label: 'Kegiatan Penanganan Perkara (DS #4)', icon: Gavel },
            { id: 'komparasi_litigasi', label: 'Litigasi vs Non-Litigasi (DS #9 & #10)', icon: Scale },
            { id: 'jdihn_nasional', label: 'Penilaian JDIHN Nasional (Skor 100)', icon: Award },
            { id: 'pipeline_regulasi', label: 'Pipeline Regulasi & Perka (DS #5-#8)', icon: FolderOpen },
            { id: 'kajian_mitigasi', label: 'Kajian & Pendampingan JPN (DS #1 & #2)', icon: ShieldCheck },
            { id: 'kpi_word_doc', label: 'Laporan Resmi Word (.doc)', icon: FileText },
            { id: 'kamus_rumus', label: 'Kamus Rumus & 10 Dataset (PDF)', icon: FileCode2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* 2. FILTER BAR (Requirement #8: Filter yang cocok)              */}
      {/* --------------------------------------------------------------- */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs shrink-0">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-semibold uppercase tracking-wider text-[10.5px]">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Filter Biro Hukum:</span>
          </div>

          {/* Filter Tahun */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-md px-2 py-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span className="text-slate-500 text-[11px]">Tahun:</span>
            <select
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(e.target.value)}
              className="bg-transparent font-medium text-slate-700 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="all">Semua Tahun (2025-2026)</option>
              <option value="2026">Tahun 2026 (YTD Aktif)</option>
              <option value="2025">Tahun 2025</option>
            </select>
          </div>

          {/* Filter Klaster Bidang Hukum */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-md px-2 py-1">
            <Building2 className="w-3 h-3 text-slate-400" />
            <span className="text-slate-500 text-[11px]">Klaster:</span>
            <select
              value={selectedKlaster}
              onChange={(e) => setSelectedKlaster(e.target.value)}
              className="bg-transparent font-medium text-slate-700 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="all">Semua Bidang Hukum</option>
              <option value="perdata">Perdata (Pertanahan / HPL / BMN)</option>
              <option value="tata usaha negara">Tata Usaha Negara (TUN)</option>
              <option value="arbitrase">Arbitrase &amp; KSO Mitra</option>
              <option value="ketenagakerjaan">Ketenagakerjaan (PHI)</option>
              <option value="pidana">Pidana Khusus Aset</option>
            </select>
          </div>

          {/* Filter Status Perkara */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-md px-2 py-1">
            <CheckCircle2 className="w-3 h-3 text-slate-400" />
            <span className="text-slate-500 text-[11px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent font-medium text-slate-700 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="all">Semua Status Perkara</option>
              <option value="selesai">Selesai (Inkracht / Dading)</option>
              <option value="proses">Dalam Proses Persidangan</option>
              <option value="mediasi">Dalam Mediasi / Konsolidasi</option>
            </select>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[220px] max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nomor perkara / tentang..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs rounded-md border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* 3. MAIN DASHBOARD CONTENT AREA                                  */}
      {/* --------------------------------------------------------------- */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* ============================================================= */}
        {/* TAB 1: IKHTISAR 4 KPI UTAMA & EXECUTIVE SUMMARY               */}
        {/* ============================================================= */}
        {currentTab === 'ikhtisar' && (
          <div className="space-y-6">
            {/* 4 PRIMARY EXECUTIVE KPI CARDS (Requirements #1, #2, #3, #4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* KPI 1: JUMLAH PENANGANAN PERKARA (Dataset #4) */}
              <div
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('hukum-kpi-1')}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider text-[10.5px] text-blue-700 flex items-center gap-1">
                    <Gavel className="w-3.5 h-3.5 text-blue-600" />
                    Penanganan Perkara
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                    Dataset #4
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-2">
                  <span>{totalKasusPerkara}</span>
                  <span className="text-xs font-semibold text-slate-500">Perkara Aktif</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Total Dokumen: <strong>{totalDokumenPerkara}</strong> berkas</span>
                  </div>
                  <span className="text-[10px] text-blue-600 font-medium group-hover:underline flex items-center">
                    Rumus <HelpCircle className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Atribut: TANGGAL, TENTANG, JUMLAH DOKUMEN
                </div>
              </div>

              {/* KPI 2: PENILAIAN KERJA JDIHN-SE INDONESIA (Nilai 100) */}
              <div
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('hukum-kpi-2')}
                className="bg-white rounded-xl p-4 border border-emerald-200 bg-gradient-to-br from-white to-emerald-50/40 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider text-[10.5px] text-emerald-800 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    Kinerja JDIHN Nasional
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                    Kemenkumham RI
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-700 tracking-tight flex items-baseline gap-2">
                  <span>{skorJdihn}</span>
                  <span className="text-xs font-semibold text-emerald-600">/ 100 (Sempurna)</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-emerald-900 pt-2 border-t border-emerald-100">
                  <span className="text-[11px] font-medium text-emerald-700 truncate">
                    Predikat: Anggota JDIHN Terbaik Nasional
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium group-hover:underline flex items-center">
                    Detail <HelpCircle className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Evaluasi 5 Pilar JDIHN se-Indonesia (BPHN)
                </div>
              </div>

              {/* KPI 3: % PENANGANAN PERKARA DISELESAIKAN (LITIGASI - Dataset #9) */}
              <div
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('hukum-kpi-3')}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider text-[10.5px] text-indigo-700 flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-indigo-600" />
                    % Penyelesaian Litigasi
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                    Dataset #9
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-indigo-700 tracking-tight flex items-baseline gap-2">
                  <span>{avgSelesaiLitigasi}%</span>
                  <span className="text-xs font-semibold text-slate-500">Inkracht</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Rasio Menang: <strong>100%</strong> s/d Inkracht</span>
                  </div>
                  <span className="text-[10px] text-indigo-600 font-medium group-hover:underline flex items-center">
                    Rumus <HelpCircle className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Atribut: TANGGAL, TENTANG (Pengadilan Negeri / PTUN)
                </div>
              </div>

              {/* KPI 4: % PELAYANAN & PENANGANAN NON-LITIGASI (Dataset #10) */}
              <div
                onClick={() => onOpenFormulaModal && onOpenFormulaModal('hukum-kpi-4')}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider text-[10.5px] text-teal-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    % Penanganan Non-Litigasi
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-teal-50 text-teal-700 border border-teal-200 font-mono">
                    Dataset #10
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-teal-700 tracking-tight flex items-baseline gap-2">
                  <span>{avgPelayananNonLitigasi}%</span>
                  <span className="text-xs font-semibold text-slate-500">Layanan Tuntas</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    <span>Mediasi &amp; Legal Opinion Terselesaikan</span>
                  </div>
                  <span className="text-[10px] text-teal-600 font-medium group-hover:underline flex items-center">
                    Rumus <HelpCircle className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Atribut: TANGGAL, TENTANG (Penyelesaian Damai)
                </div>
              </div>
            </div>

            {/* SECONDARY VALUE SUMMARY: VALUE PROTEKSI ASET BP BATAM */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-xl p-4 sm:p-5 text-white shadow-xs border border-blue-800/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-700/50 border border-blue-400/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-200" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                    Nilai Aset &amp; Potensi Kerugian Negara yang Berhasil Dimatangkan / Diminimalisir
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Rp {totalAsetMitigasiMiliar.toFixed(1)} Miliar
                  </div>
                  <div className="text-xs text-blue-200/90 mt-0.5">
                    Melalui pembelaan yuridis yang solid di pengadilan (Litigasi) dan negosiasi akta perdamaian sukarela (Non-Litigasi).
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
                <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-xs border border-white/10 text-right">
                  <span className="text-[10px] text-blue-200 block uppercase font-mono">Total Agregat Perkara</span>
                  <span className="text-base font-bold text-white font-mono">{grandTotalAgregat} Kasus Tergabung</span>
                </div>
              </div>
            </div>

            {/* VISUALIZATION SECTION: KOMPARASI LITIGASI VS NON LITIGASI & DOKUMEN TIMELINE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* REQUIREMENT #6: PENANGANAN PERKARA LITIGASI VS NON LITIGASI DENGAN FORMULA */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-blue-600" />
                      Komparasi Litigasi vs. Non-Litigasi per Tentang Perkara
                    </h3>
                    <p className="text-xs text-slate-500">
                      Formula: <code className="bg-slate-100 text-blue-700 px-1 py-0.5 rounded font-mono text-[11px]">Total = SUM(Litigasi) + SUM(Non-Litigasi)</code>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Dataset #9 &amp; #10
                  </span>
                </div>

                <div className="h-72 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredTemaAgregat}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis
                        type="category"
                        dataKey="tentang"
                        tick={{ fontSize: 10 }}
                        width={140}
                        tickFormatter={(val) => (val.length > 22 ? val.slice(0, 22) + '...' : val)}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs border border-slate-700 max-w-xs">
                                <div className="font-bold text-amber-300 mb-1">{data.tentang}</div>
                                <div className="text-[11px] text-slate-300 mb-2">Klaster: {data.klusterBidang}</div>
                                <div className="space-y-1 border-t border-slate-700 pt-1.5 font-mono">
                                  <div className="flex justify-between text-blue-300">
                                    <span>Litigasi (Pengadilan):</span>
                                    <span>{data.jumlahLitigasi} kasus</span>
                                  </div>
                                  <div className="flex justify-between text-teal-300">
                                    <span>Non-Litigasi (Mediasi):</span>
                                    <span>{data.jumlahNonLitigasi} kasus</span>
                                  </div>
                                  <div className="flex justify-between font-bold text-white border-t border-slate-700 pt-1">
                                    <span>Total Penanganan:</span>
                                    <span>{data.totalPenanganan} kasus</span>
                                  </div>
                                  <div className="flex justify-between text-emerald-400">
                                    <span>Tingkat Keberhasilan:</span>
                                    <span>{data.tingkatKeberhasilanPersen}%</span>
                                  </div>
                                  <div className="flex justify-between text-amber-300">
                                    <span>Nilai Aset Terkait:</span>
                                    <span>Rp {data.mitigasiRisikoAsetMiliar} M</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        formatter={(value) => <span className="text-xs font-semibold text-slate-700">{value}</span>}
                      />
                      <Bar dataKey="jumlahLitigasi" name="Litigasi (No. 9)" fill="#1E40AF" stackId="a" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="jumlahNonLitigasi" name="Non-Litigasi (No. 10)" fill="#0D9488" stackId="a" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-md flex items-center justify-between">
                  <span>*Data menggabungkan sengketa dengan pokok materiil yang sama antar jalur penyelesaian.</span>
                  <button
                    onClick={() => setCurrentTab('komparasi_litigasi')}
                    className="text-blue-600 font-bold hover:underline flex items-center"
                  >
                    Buka Tabel Detail <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>

              {/* REQUIREMENT #5: KEGIATAN PENANGANAN PERKARA (TIMELINE & DOKUMEN BERKAS) */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-indigo-600" />
                      Tren Volume Dokumen &amp; Perkara Sidang per Bulan
                    </h3>
                    <p className="text-xs text-slate-500">
                      Visualisasi Dataset #4: Tanggal, Tentang, dan Jumlah Dokumen Berkas
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Dataset #4
                  </span>
                </div>

                <div className="h-72 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={documentMonthlyDistribution} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 11 }} label={{ value: 'Jumlah Dokumen', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748B' }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} label={{ value: 'Perkara', angle: 90, position: 'insideRight', fontSize: 10, fill: '#64748B' }} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-slate-900 text-white p-2.5 rounded-lg shadow-xl text-xs">
                                <div className="font-bold text-sky-300">{label}</div>
                                <div className="mt-1 font-mono space-y-0.5">
                                  <div className="text-indigo-300">Volume Dokumen: {payload[0]?.value} berkas</div>
                                  <div className="text-emerald-300">Perkara Teregister: {payload[1]?.value} perkara</div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line yAxisId="left" type="monotone" dataKey="dokumen" name="Jumlah Dokumen Berkas" stroke="#4F46E5" strokeWidth={2.5} activeDot={{ r: 6 }} />
                      <Line yAxisId="right" type="monotone" dataKey="perkara" name="Perkara Sidang Aktif" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-md flex items-center justify-between">
                  <span>Rata-rata 24,5 dokumen hukum/surat kuasa/bukti per perkara yang ditangani.</span>
                  <button
                    onClick={() => setCurrentTab('kegiatan_perkara')}
                    className="text-indigo-600 font-bold hover:underline flex items-center"
                  >
                    Lihat Daftar Perkara <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* REQUIREMENT #7: RANCANGAN PENGAWASAN STRATEGIS UNTUK ATASAN MEMANTAU (PIPELINE REGULASI & JDIHN) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Pipeline Pembentukan Produk Hukum BP Batam (Dataset 5, 6, 7, 8) */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-amber-600" />
                      Pipeline Pembentukan Produk Hukum BP Batam (Perka, Kepka &amp; MoU)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Dataset #5 (Perka), #6 (Kepka), #7 (Perjanjian/MoU), dan #8 (Regulasi Investasi)
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentTab('pipeline_regulasi')}
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center"
                  >
                    Selengkapnya <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>

                {/* Funnel Stages Progress */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">1. Drafting</span>
                    <span className="text-lg font-black text-slate-800">4 Naskah</span>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5">Penyusunan Awal</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-200 text-center">
                    <span className="text-[10px] text-blue-700 font-bold uppercase block">2. Harmonisasi</span>
                    <span className="text-lg font-black text-blue-900">8 Naskah</span>
                    <span className="text-[9.5px] text-blue-600 block mt-0.5">Kanwil Kemenkumham</span>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200 text-center">
                    <span className="text-[10px] text-amber-700 font-bold uppercase block">3. Pleno Pimpinan</span>
                    <span className="text-lg font-black text-amber-900">5 Naskah</span>
                    <span className="text-[9.5px] text-amber-600 block mt-0.5">Persetujuan Kepala</span>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200 text-center">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block">4. Penetapan &amp; JDIHN</span>
                    <span className="text-lg font-black text-emerald-900">12 Regulasi</span>
                    <span className="text-[9.5px] text-emerald-600 block mt-0.5">Diundangkan &amp; Sah</span>
                  </div>
                </div>

                {/* Table Snippet */}
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Jenis Produk Hukum</th>
                        <th className="px-3 py-2">Tentang / Perihal</th>
                        <th className="px-3 py-2">Tahapan Saat Ini</th>
                        <th className="px-3 py-2">Relevan Investasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {DAFTAR_PRODUK_HUKUM.slice(0, 4).map((reg) => (
                        <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-2 font-medium text-slate-800 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                              {reg.jenis}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-slate-700 max-w-xs truncate" title={reg.tentang}>
                            {reg.tentang}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                reg.tahap === 'Penetapan & JDIHN'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : reg.tahap === 'Harmonisasi Kemenkumham'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {reg.tahap}
                            </span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            {reg.relevanInvestasi ? (
                              <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                                <CheckCircle2 className="w-3 h-3" /> Ramah Investasi
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Reguler</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card 2: Penilaian Kerja JDIHN 100 & Mitigasi Risiko */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-600" />
                      Evaluasi JDIHN Kemenkumham
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                      SKOR 100
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200 text-emerald-950 mb-3">
                    <div className="text-xs font-bold text-emerald-900 mb-1">
                      {JDIHN_PERFORMANCE_DATA.predikat}
                    </div>
                    <p className="text-[11px] text-emerald-800/90 leading-relaxed">
                      BP Batam memperoleh predikat Terbaik Se-Indonesia dalam kepatuhan publikasi produk hukum, sistem API
                      JDIHN.go.id, dan keterbukaan informasi regulasi ramah investasi.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    {JDIHN_PERFORMANCE_DATA.indikatorPenilaian.slice(0, 3).map((ind, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-700 font-medium truncate max-w-[180px]">{ind.kategori}</span>
                        <span className="font-mono font-bold text-emerald-700">
                          {ind.skorCapaian}/{ind.skorMaks}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Integrasi API: 100% Terverifikasi</span>
                  <button
                    onClick={() => setCurrentTab('jdihn_nasional')}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center"
                  >
                    Buka 5 Pilar <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 2: KEGIATAN PENANGANAN PERKARA (DATASET #4)               */}
        {/* ============================================================= */}
        {currentTab === 'kegiatan_perkara' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-blue-700" />
                    Dataset #4: Kegiatan Penanganan Perkara (TANGGAL, TENTANG, JUMLAH DOKUMEN)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Data statistik perbulan perkara aktif BP Batam di Pengadilan Negeri, PTUN, PHI, dan Badan Arbitrase Nasional Indonesia
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200">
                    Total: {filteredKegiatanPerkara.length} Perkara ({totalDokumenPerkara} Berkas)
                  </span>
                </div>
              </div>

              {/* Chart: Perkara per Klasifikasi Hukum */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-5">
                <div className="lg:col-span-2 h-64">
                  <span className="text-xs font-bold text-slate-700 mb-2 block">
                    Distribusi Perkara Berdasarkan Klasifikasi Hukum &amp; Jumlah Dokumen
                  </span>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredKegiatanPerkara} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="nomorPerkara" tick={{ fontSize: 9.5 }} angle={-20} textAnchor="end" />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-2.5 rounded shadow-lg text-xs max-w-xs">
                                <div className="font-bold text-sky-300">{d.nomorPerkara}</div>
                                <div className="text-[11px] text-slate-300 mt-0.5">{d.tentang}</div>
                                <div className="mt-2 border-t border-slate-700 pt-1 font-mono text-[11px]">
                                  <div>Jumlah Dokumen: {d.jumlahDokumen} berkas</div>
                                  <div>Pengadilan: {d.instansiPengadilan}</div>
                                  <div>Status: {d.status}</div>
                                  <div>Nilai Aset: Rp {d.mitigasiNilaiSengketaMiliar} M</div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="jumlahDokumen" name="Jumlah Dokumen Berkas" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-64 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-slate-700 mb-2 block text-center">
                    Komposisi Klasifikasi Perkara
                  </span>
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={klasifikasiPerkaraPie}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        innerRadius={40}
                        paddingAngle={3}
                      >
                        {klasifikasiPerkaraPie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-2 text-[10px]">
                    {klasifikasiPerkaraPie.map((item, idx) => (
                      <span key={idx} className="flex items-center gap-1 text-slate-600">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Table: Dataset #4 */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0F1E36] text-white font-semibold">
                    <tr>
                      <th className="px-3.5 py-2.5">No. Perkara</th>
                      <th className="px-3.5 py-2.5">Tanggal</th>
                      <th className="px-3.5 py-2.5">Tentang (Pokok Perkara)</th>
                      <th className="px-3.5 py-2.5">Instansi Pengadilan</th>
                      <th className="px-3.5 py-2.5 text-center">Jumlah Dokumen</th>
                      <th className="px-3.5 py-2.5">Status &amp; Tahapan Sidang</th>
                      <th className="px-3.5 py-2.5 text-right">Nilai Sengketa</th>
                      <th className="px-3.5 py-2.5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredKegiatanPerkara.map((item) => (
                      <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-3.5 py-3 font-mono font-bold text-blue-900 whitespace-nowrap">
                          {item.nomorPerkara}
                        </td>
                        <td className="px-3.5 py-3 font-mono text-slate-600 whitespace-nowrap">
                          {item.tanggal}
                        </td>
                        <td className="px-3.5 py-3 text-slate-800 font-medium max-w-sm">
                          <div>{item.tentang}</div>
                          <span className="text-[10px] text-slate-500 font-normal block mt-0.5">
                            Unit: {item.unitTerkait} • Klasifikasi: {item.klasifikasi}
                          </span>
                        </td>
                        <td className="px-3.5 py-3 text-slate-700 whitespace-nowrap">
                          {item.instansiPengadilan}
                        </td>
                        <td className="px-3.5 py-3 text-center whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full font-mono font-bold text-xs bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {item.jumlahDokumen} berkas
                          </span>
                        </td>
                        <td className="px-3.5 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold inline-block mb-0.5 ${
                              item.status === 'Selesai Inkracht'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : item.status === 'Mediasi'
                                ? 'bg-teal-100 text-teal-800 border border-teal-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate max-w-xs">{item.tahapan}</span>
                        </td>
                        <td className="px-3.5 py-3 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                          Rp {item.mitigasiNilaiSengketaMiliar.toFixed(1)} M
                        </td>
                        <td className="px-3.5 py-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => setSelectedPerkaraModal(item)}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-semibold transition-colors cursor-pointer"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 3: KOMPARASI LITIGASI VS NON-LITIGASI (DATASET #9 & #10)  */}
        {/* ============================================================= */}
        {currentTab === 'komparasi_litigasi' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-indigo-700" />
                    Penanganan Perkara Litigasi (DS #9) vs. Non-Litigasi (DS #10)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    <strong>Formula:</strong> Menggabungkan perkara yang memiliki tema ("TENTANG") yang sama:{' '}
                    <code className="font-mono text-indigo-700 font-bold">Total = SUM(Litigasi) + SUM(Non-Litigasi)</code>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-mono text-xs font-bold border border-indigo-200">
                    Grand Total: {grandTotalAgregat} Kasus Tergabung
                  </span>
                </div>
              </div>

              {/* Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10.5px] font-bold uppercase text-blue-700 block">Jalur Litigasi (Pengadilan)</span>
                  <div className="text-2xl font-black text-blue-950 mt-0.5">{totalAgregatLitigasi} Perkara</div>
                  <span className="text-[11px] text-blue-600 mt-1 block">Dataset No. 9 • Rata-rata Selesai {avgSelesaiLitigasi}%</span>
                </div>
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
                  <span className="text-[10.5px] font-bold uppercase text-teal-700 block">Jalur Non-Litigasi (Mediasi / ADR)</span>
                  <div className="text-2xl font-black text-teal-950 mt-0.5">{totalAgregatNonLitigasi} Perkara</div>
                  <span className="text-[11px] text-teal-600 mt-1 block">Dataset No. 10 • Rata-rata Selesai {avgPelayananNonLitigasi}%</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10.5px] font-bold uppercase text-emerald-700 block">Tingkat Keberhasilan Gabungan</span>
                  <div className="text-2xl font-black text-emerald-950 mt-0.5">92,8%</div>
                  <span className="text-[11px] text-emerald-600 mt-1 block">Proteksi Yuridis &amp; Penyelamatan Aset</span>
                </div>
              </div>

              {/* Grouped Bar Chart: Litigasi vs Non-Litigasi */}
              <div className="h-80 my-5">
                <span className="text-xs font-bold text-slate-700 mb-2 block">
                  Grafik Komparasi Kasus per Tema / Tentang Masalah Hukum yang Sama
                </span>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredTemaAgregat} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis
                      dataKey="tentang"
                      tick={{ fontSize: 10 }}
                      angle={-15}
                      textAnchor="end"
                      tickFormatter={(v) => (v.length > 25 ? v.slice(0, 25) + '...' : v)}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs max-w-xs">
                              <div className="font-bold text-amber-300">{d.tentang}</div>
                              <div className="text-[11px] text-slate-300 mt-0.5">Klaster: {d.klusterBidang}</div>
                              <div className="border-t border-slate-700 my-1.5 pt-1.5 font-mono space-y-0.5">
                                <div className="text-blue-300">Litigasi (No. 9): {d.jumlahLitigasi} kasus</div>
                                <div className="text-teal-300">Non-Litigasi (No. 10): {d.jumlahNonLitigasi} kasus</div>
                                <div className="text-white font-bold">Total Formula: {d.totalPenanganan} kasus</div>
                                <div className="text-emerald-400">Keberhasilan: {d.tingkatKeberhasilanPersen}%</div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="jumlahLitigasi" name="Kasus Litigasi (Dataset #9)" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="jumlahNonLitigasi" name="Kasus Non-Litigasi (Dataset #10)" fill="#0D9488" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="totalPenanganan" name="Formula: SUM(Litigasi + Non-Litigasi)" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table: Aggregation by Theme */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl mt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0F1E36] text-white font-semibold">
                    <tr>
                      <th className="px-3.5 py-2.5">Tentang / Pokok Sengketa Hukum</th>
                      <th className="px-3.5 py-2.5">Klaster Bidang</th>
                      <th className="px-3.5 py-2.5 text-center bg-blue-950/60">Litigasi (No. 9)</th>
                      <th className="px-3.5 py-2.5 text-center bg-teal-950/60">Non-Litigasi (No. 10)</th>
                      <th className="px-3.5 py-2.5 text-center bg-indigo-950 font-bold">Total Formula (SUM)</th>
                      <th className="px-3.5 py-2.5 text-center">Tingkat Keberhasilan</th>
                      <th className="px-3.5 py-2.5 text-right">Proteksi Nilai Aset</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredTemaAgregat.map((t, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3.5 py-2.5 font-medium text-slate-800 max-w-sm">
                          {t.tentang}
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-600">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[10.5px] font-mono">
                            {t.klusterBidang}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono font-bold text-blue-700 bg-blue-50/40">
                          {t.jumlahLitigasi}
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono font-bold text-teal-700 bg-teal-50/40">
                          {t.jumlahNonLitigasi}
                        </td>
                        <td className="px-3.5 py-2.5 text-center font-mono font-black text-indigo-900 bg-indigo-50/80 text-sm">
                          {t.totalPenanganan}
                        </td>
                        <td className="px-3.5 py-2.5 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800">
                            {t.tingkatKeberhasilanPersen}%
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-right font-mono font-bold text-slate-800">
                          Rp {t.mitigasiRisikoAsetMiliar.toFixed(1)} M
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 4: PENILAIAN JDIHN NASIONAL (SKOR 100)                     */}
        {/* ============================================================= */}
        {currentTab === 'jdihn_nasional' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    Penilaian Kinerja JDIHN-se Indonesia (Skor: 100 / 100)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Evaluasi Resmi Kementerian Hukum dan HAM Republik Indonesia (BPHN) terhadap Pengelolaan Dokumentasi &amp; Informasi Hukum
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-xs shadow-xs">
                    PREDIKAT TERBAIK NASIONAL
                  </span>
                </div>
              </div>

              {/* Big Scorecard Display */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5">
                <div className="md:col-span-1 bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md">
                  <Award className="w-12 h-12 text-emerald-300 mb-2 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">SKOR AKHIR JDIHN</span>
                  <div className="text-5xl font-black text-white mt-1">100</div>
                  <span className="text-xs text-emerald-200 mt-1">Skor Maksimal: 100 Poin</span>
                  <div className="mt-3 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-[10px] font-bold border border-emerald-400/30">
                    Akreditasi Peringkat I
                  </div>
                </div>

                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Lembaga Penilai</span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">{JDIHN_PERFORMANCE_DATA.pemberiPenghargaan}</span>
                    <p className="text-xs text-slate-600 mt-1">Badan Pembinaan Hukum Nasional (BPHN) RI</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Kategori Penghargaan</span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">LPNK / Badan Otorita Pengusahaan</span>
                    <p className="text-xs text-slate-600 mt-1">Terbaik Se-Indonesia di antara Lembaga Non-Kementerian</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Status Integrasi Sistem</span>
                    <span className="text-sm font-bold text-emerald-700 mt-0.5 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      100% Real-Time API Sinkronisasi
                    </span>
                    <p className="text-xs text-slate-600 mt-1">Terhubung penuh ke portal nasional JDIHN.go.id</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Koleksi Peraturan Digital</span>
                    <span className="text-sm font-bold text-slate-900 mt-0.5 block">1.240+ Produk Hukum Terindeks</span>
                    <p className="text-xs text-slate-600 mt-1">Perka, Kepka, Instruksi &amp; Perjanjian Kerjasama</p>
                  </div>
                </div>
              </div>

              {/* 5 Pillars Table */}
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Rincian Evaluasi 5 Pilar Standar JDIHN Kemenkumham RI
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold">
                    <tr>
                      <th className="px-3.5 py-2.5">Indikator Pilar Penilaian</th>
                      <th className="px-3.5 py-2.5 text-center">Bobot</th>
                      <th className="px-3.5 py-2.5 text-center">Skor Maks</th>
                      <th className="px-3.5 py-2.5 text-center">Capaian BP Batam</th>
                      <th className="px-3.5 py-2.5">Status Kepatuhan</th>
                      <th className="px-3.5 py-2.5">Catatan Evaluator BPHN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {JDIHN_PERFORMANCE_DATA.indikatorPenilaian.map((pilar, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-3.5 py-2.5 font-bold text-slate-800">{pilar.kategori}</td>
                        <td className="px-3.5 py-2.5 text-center font-mono">{pilar.bobot}</td>
                        <td className="px-3.5 py-2.5 text-center font-mono">{pilar.skorMaks}</td>
                        <td className="px-3.5 py-2.5 text-center font-mono font-bold text-emerald-700 text-sm">
                          {pilar.skorCapaian}
                        </td>
                        <td className="px-3.5 py-2.5">
                          <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800">
                            {pilar.status}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-600 max-w-sm">{pilar.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 5: PIPELINE REGULASI & PERKA (DATASET #5, #6, #7, #8)     */}
        {/* ============================================================= */}
        {currentTab === 'pipeline_regulasi' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-amber-600" />
                    Pipeline Pembentukan Regulasi, Kepka, &amp; Perjanjian Kerjasama
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monitoring atasan terhadap proses legislasi: Peraturan Kepala (DS #5), Keputusan Kepala (DS #6), MoU/PKS (DS #7), dan Regulasi Investasi (DS #8)
                  </p>
                </div>
              </div>

              {/* Status Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl mt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0F1E36] text-white font-semibold">
                    <tr>
                      <th className="px-3.5 py-2.5">No. Draft</th>
                      <th className="px-3.5 py-2.5">Jenis Produk</th>
                      <th className="px-3.5 py-2.5">Tanggal</th>
                      <th className="px-3.5 py-2.5">Tentang / Pokok Regulasi</th>
                      <th className="px-3.5 py-2.5">Unit Pemrakarsa</th>
                      <th className="px-3.5 py-2.5 text-center">Dokumen</th>
                      <th className="px-3.5 py-2.5">Tahapan Legislasi</th>
                      <th className="px-3.5 py-2.5 text-center">Fasilitas Investasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {DAFTAR_PRODUK_HUKUM.map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-50">
                        <td className="px-3.5 py-2.5 font-mono font-bold text-blue-900">{reg.nomorDraft}</td>
                        <td className="px-3.5 py-2.5 font-medium text-slate-700">{reg.jenis}</td>
                        <td className="px-3.5 py-2.5 font-mono text-slate-600">{reg.tanggal}</td>
                        <td className="px-3.5 py-2.5 font-medium text-slate-900 max-w-sm">{reg.tentang}</td>
                        <td className="px-3.5 py-2.5 text-slate-600">{reg.unitPemrakarsa}</td>
                        <td className="px-3.5 py-2.5 text-center font-mono font-bold text-indigo-700">
                          {reg.jumlahDokumen}
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                              reg.tahap === 'Penetapan & JDIHN'
                                ? 'bg-emerald-100 text-emerald-800'
                                : reg.tahap === 'Harmonisasi Kemenkumham'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {reg.tahap}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-center">
                          {reg.relevanInvestasi ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10.5px] border border-emerald-200">
                              Ya (Dataset #8)
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10.5px]">Reguler</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 6: KAJIAN & PENDAMPINGAN HUKUM JPN (DATASET #1 & #2)       */}
        {/* ============================================================= */}
        {currentTab === 'kajian_mitigasi' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-700" />
                    Kajian Hukum (DS #1) &amp; Pendampingan Jaksa Pengacara Negara (DS #2)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mitigasi risiko proyek strategis BP Batam bersama Kejaksaan Tinggi Kepulauan Riau dan BPKP
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                {DATA_KAJIAN_PENDAMPINGAN.map((kjn) => (
                  <div key={kjn.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-100 text-blue-800 text-[10px]">
                        {kjn.kategori}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">{kjn.tanggal}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm leading-snug mb-2">{kjn.tentang}</div>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 text-slate-600">
                      <div>Mitra: <strong>{kjn.mitraKerjasama}</strong></div>
                      <div className="font-mono font-bold text-emerald-700">Rp {kjn.nilaiPenyelamatanRpMiliar} M</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 7: DOKUMEN RESMI WORD (.DOC)                              */}
        {/* ============================================================= */}
        {currentTab === 'kpi_word_doc' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-700" />
                  Format Dokumen Laporan Eksekutif Biro Hukum (.doc)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Laporan resmi terformat untuk rapat pimpinan Anggota Bidang / Kepala BP Batam
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyDoc}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedDoc ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDoc ? 'Tersalin ke Clipboard!' : 'Salin Laporan'}</span>
                </button>
                <button
                  onClick={handleDownloadDoc}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .doc</span>
                </button>
              </div>
            </div>

            {/* Document Preview Box */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-300 shadow-md font-serif text-slate-800 max-w-4xl mx-auto text-xs sm:text-sm leading-relaxed space-y-4">
              <div className="text-center border-b-2 border-slate-900 pb-3">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 uppercase">
                  BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
                </h2>
                <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase">
                  BIRO HUKUM - LAPORAN KINERJA PENANGANAN PERKARA &amp; REGULASI
                </h3>
                <span className="text-[11px] font-sans text-slate-500">
                  Periode Evaluasi 2025/2026 • Sumber Data: Atribut Daftar Data Satu Data BP Batam (Halaman 2)
                </span>
              </div>

              <div>
                <h4 className="font-bold font-sans text-xs uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1 mb-2">
                  I. Capaian Indikator Kinerja Utama (IKU)
                </h4>
                <div className="overflow-x-auto font-sans">
                  <table className="w-full text-left text-xs border border-slate-300">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-2 border border-slate-300">Indikator</th>
                        <th className="p-2 border border-slate-300">Dataset Rujukan</th>
                        <th className="p-2 border border-slate-300">Target</th>
                        <th className="p-2 border border-slate-300">Realisasi</th>
                        <th className="p-2 border border-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-slate-300 font-medium">Jumlah Penanganan Perkara</td>
                        <td className="p-2 border border-slate-300 font-mono">Dataset #4</td>
                        <td className="p-2 border border-slate-300">Monitoring Penuh</td>
                        <td className="p-2 border border-slate-300 font-bold">{totalKasusPerkara} Perkara ({totalDokumenPerkara} Dokumen)</td>
                        <td className="p-2 border border-slate-300 text-emerald-700 font-bold">Terkendali</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-medium">Penilaian JDIHN Se-Indonesia</td>
                        <td className="p-2 border border-slate-300 font-mono">Standar Kemenkumham</td>
                        <td className="p-2 border border-slate-300">100 Poin</td>
                        <td className="p-2 border border-slate-300 font-bold text-emerald-700">100 / 100</td>
                        <td className="p-2 border border-slate-300 text-emerald-700 font-bold">Terbaik Nasional</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-medium">% Penanganan Perkara Selesai (Litigasi)</td>
                        <td className="p-2 border border-slate-300 font-mono">Dataset #9</td>
                        <td className="p-2 border border-slate-300">&ge; 85%</td>
                        <td className="p-2 border border-slate-300 font-bold">{avgSelesaiLitigasi}%</td>
                        <td className="p-2 border border-slate-300 text-emerald-700 font-bold">Tercapai</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-medium">% Pelayanan Hukum (Non-Litigasi)</td>
                        <td className="p-2 border border-slate-300 font-mono">Dataset #10</td>
                        <td className="p-2 border border-slate-300">&ge; 90%</td>
                        <td className="p-2 border border-slate-300 font-bold">{avgPelayananNonLitigasi}%</td>
                        <td className="p-2 border border-slate-300 text-emerald-700 font-bold">Sangat Baik</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold font-sans text-xs uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-1 mb-2">
                  II. Formula Agregasi Perkara Litigasi &amp; Non-Litigasi
                </h4>
                <p className="font-sans text-slate-700 text-xs mb-2">
                  Berdasarkan instruksi pimpinan, perkara yang memiliki materi pokok ("TENTANG") yang sama diagregasikan secara matematis dengan formula:
                  <br />
                  <code className="bg-slate-100 p-1 rounded font-mono text-indigo-700 block my-1">
                    Formula: Total Kasus per Tema = SUM(Litigasi [DS 9]) + SUM(Non-Litigasi [DS 10])
                  </code>
                </p>
                <div className="overflow-x-auto font-sans">
                  <table className="w-full text-left text-xs border border-slate-300">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-2 border border-slate-300">Tentang Pokok Perkara</th>
                        <th className="p-2 border border-slate-300 text-center">Litigasi (No. 9)</th>
                        <th className="p-2 border border-slate-300 text-center">Non-Litigasi (No. 10)</th>
                        <th className="p-2 border border-slate-300 text-center font-bold">Total Formula</th>
                        <th className="p-2 border border-slate-300 text-center">Tingkat Keberhasilan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TEMA_PERKARA_AGREGAT.map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-2 border border-slate-300">{item.tentang}</td>
                          <td className="p-2 border border-slate-300 text-center font-mono">{item.jumlahLitigasi}</td>
                          <td className="p-2 border border-slate-300 text-center font-mono">{item.jumlahNonLitigasi}</td>
                          <td className="p-2 border border-slate-300 text-center font-mono font-bold text-blue-900">{item.totalPenanganan}</td>
                          <td className="p-2 border border-slate-300 text-center">{item.tingkatKeberhasilanPersen}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 8: KAMUS RUMUS & 10 DATASET SATU DATA (HALAMAN 2 PDF)     */}
        {/* ============================================================= */}
        {currentTab === 'kamus_rumus' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileCode2 className="w-5 h-5 text-blue-700" />
                    Katalog 10 Dataset Resmi Biro Hukum BP Batam (Halaman 2 PDF)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dokumen Rujukan: <em>Atribut Daftar Data Satu Data.pdf</em> - Biro Hukum BP Batam
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200">
                    10 Dataset Terdaftar
                  </span>
                </div>
              </div>

              {/* Dataset Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl mt-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0F1E36] text-white font-semibold">
                    <tr>
                      <th className="px-3.5 py-2.5 text-center">No</th>
                      <th className="px-3.5 py-2.5">Nama Dataset</th>
                      <th className="px-3.5 py-2.5">Jenis Data</th>
                      <th className="px-3.5 py-2.5">Periode</th>
                      <th className="px-3.5 py-2.5">Sifat Data</th>
                      <th className="px-3.5 py-2.5">Atribut Data (Field Metadata)</th>
                      <th className="px-3.5 py-2.5">Keterangan &amp; Penerapan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {BIRO_HUKUM_10_DATASETS.map((ds) => (
                      <tr key={ds.no} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3.5 py-3 text-center font-mono font-bold text-blue-900">
                          {ds.no}
                        </td>
                        <td className="px-3.5 py-3 font-bold text-slate-900 max-w-xs">
                          {ds.namaData}
                        </td>
                        <td className="px-3.5 py-3 font-mono text-slate-600">
                          {ds.jenisData}
                        </td>
                        <td className="px-3.5 py-3 font-mono text-slate-600">
                          {ds.periodeData}
                        </td>
                        <td className="px-3.5 py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ds.sifatData === 'TERTUTUP'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {ds.sifatData}
                          </span>
                        </td>
                        <td className="px-3.5 py-3">
                          <div className="flex flex-wrap gap-1">
                            {ds.atributData.map((attr, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-blue-900 border border-slate-300"
                              >
                                {attr}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3.5 py-3 text-slate-600 max-w-sm">
                          {ds.keterangan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Formula Documentation Box */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-300">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-700" />
                  Kamus Rumus &amp; Logika Perhitungan Dashboard Biro Hukum
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <span className="font-bold text-blue-900 block">1. Formula Agregasi Litigasi + Non-Litigasi</span>
                    <code className="text-indigo-700 font-mono text-[11px] block mt-1">
                      Total_Perkara(Tema) = SUM(Litigasi_Perkara[TENTANG]) + SUM(NonLitigasi_Perkara[TENTANG])
                    </code>
                    <p className="text-slate-600 text-[11px] mt-1">
                      Menghubungkan data persidangan resmi (Dataset #9) dengan layanan mediasi non-litigasi (Dataset #10) atas kesamaan objek pokok perkara.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <span className="font-bold text-blue-900 block">2. Tingkat Keberhasilan Penyelesaian Litigasi</span>
                    <code className="text-emerald-700 font-mono text-[11px] block mt-1">
                      %_Penyelesaian = (Jumlah Perkara Inkracht Selesai / Total Perkara Terdaftar) &times; 100%
                    </code>
                    <p className="text-slate-600 text-[11px] mt-1">
                      Diukur dari putusan berkekuatan hukum tetap (Inkracht) yang memenangkan posisi hukum BP Batam atau akta perdamaian (dading).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --------------------------------------------------------------- */}
      {/* 4. MODAL DETAIL PERKARA                                         */}
      {/* --------------------------------------------------------------- */}
      {selectedPerkaraModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-sm text-slate-900">Detail Kegiatan Penanganan Perkara</h3>
              </div>
              <button
                onClick={() => setSelectedPerkaraModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Nomor Perkara</span>
                <span className="font-mono font-bold text-blue-900 text-sm">{selectedPerkaraModal.nomorPerkara}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Tentang (Pokok Perkara)</span>
                <span className="text-slate-900 font-semibold text-sm leading-snug">{selectedPerkaraModal.tentang}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Tanggal Teregister</span>
                  <span className="font-mono text-slate-800">{selectedPerkaraModal.tanggal}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Jumlah Dokumen Berkas</span>
                  <span className="font-mono font-bold text-indigo-700">{selectedPerkaraModal.jumlahDokumen} Dokumen</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Instansi Pengadilan</span>
                  <span className="text-slate-800">{selectedPerkaraModal.instansiPengadilan}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block uppercase text-[10px]">Klasifikasi</span>
                  <span className="text-slate-800">{selectedPerkaraModal.klasifikasi}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Tahapan Sidang</span>
                <span className="text-slate-800 bg-slate-50 p-2 rounded block mt-0.5 border border-slate-200">
                  {selectedPerkaraModal.tahapan}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Unit Terkait &amp; Nilai Aset</span>
                <span className="text-slate-800 block">
                  {selectedPerkaraModal.unitTerkait} • Nilai Sengketa: <strong>Rp {selectedPerkaraModal.mitigasiNilaiSengketaMiliar} Miliar</strong>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedPerkaraModal(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
