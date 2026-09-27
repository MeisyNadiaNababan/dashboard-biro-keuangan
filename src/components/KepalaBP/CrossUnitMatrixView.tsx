import React, { useState } from 'react';
import {
  Building2,
  Database,
  Search,
  Download,
  Filter,
  Activity,
  Shield,
  MapPin,
  HardHat,
  Droplets,
  Layers,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCheck,
  Award
} from 'lucide-react';
import { MATRIKS_24_SATKER_DATA, SatkerMatrixItem } from './kepalaBpData';

interface CrossUnitMatrixViewProps {
  onSelectUnit?: (unitId: string) => void;
}

export const CrossUnitMatrixView: React.FC<CrossUnitMatrixViewProps> = ({ onSelectUnit }) => {
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'rsbp_ditpam' | 'satu_data'>('matrix');
  const [selectedKlaster, setSelectedKlaster] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSatkers = MATRIKS_24_SATKER_DATA.filter((satker) => {
    if (selectedKlaster !== 'ALL' && satker.klaster !== selectedKlaster) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        satker.nama.toLowerCase().includes(q) ||
        satker.kode.toLowerCase().includes(q) ||
        satker.ikpIksUtama.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleExportCsv = () => {
    const headers = [
      'Kode',
      'Nama Satuan Kerja',
      'Klaster',
      'Pagu DIPA (Miliar)',
      'Realisasi (Miliar)',
      'Serapan (%)',
      'Target/Realisasi PNBP (Miliar)',
      'IKP/IKS Utama',
      'Status Kinerja',
      'Referensi Halaman PDF',
    ];

    const rows = filteredSatkers.map((s) => [
      `"${s.kode}"`,
      `"${s.nama}"`,
      `"${s.klaster}"`,
      s.paguMiliar,
      s.realisasiMiliar,
      s.serapanPersen,
      s.pnbpMiliar,
      `"${s.ikpIksUtama}"`,
      `"${s.statusKinerja}"`,
      `"${s.halamanPdf}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Matriks_Kinerja_24_Satker_BP_Batam_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 lg:p-6 space-y-5">
      {/* Header & Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#002B49] text-cyan-300">
              <Building2 className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-900 uppercase">
              MATRIKS KONSOLIDASI 24 UNIT KERJA BP BATAM
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Integrasi capaian kinerja, pagu anggaran DIPA, serapan belanja, PNBP, dan dataset Buku Satu Data (Hal. 1 - 53)
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeSubTab === 'matrix'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Matriks 24 Satker
          </button>
          <button
            onClick={() => setActiveSubTab('rsbp_ditpam')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeSubTab === 'rsbp_ditpam'
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fokus: RSBP &amp; Ditpam
          </button>
          <button
            onClick={() => setActiveSubTab('satu_data')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeSubTab === 'satu_data'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Katalog Satu Data (Hal. 1-53)
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SUB-VIEW 1: MATRIKS KONSOLIDASI 24 SATKER                             */}
      {/* ==================================================================== */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-4">
          {/* Controls Bar: Klaster, Search & Export */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-500">Filter Klaster:</span>
              {['ALL', 'Pimpinan', 'Badan Usaha', 'Direktorat', 'Biro', 'Pusat'].map((klaster) => (
                <button
                  key={klaster}
                  onClick={() => setSelectedKlaster(klaster)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedKlaster === klaster
                      ? 'bg-[#002B49] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {klaster === 'ALL' ? 'Semua (24)' : klaster}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari satker / IKP..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 outline-none"
                />
              </div>

              <button
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10.5px] uppercase font-bold text-slate-500 tracking-wider font-mono">
                  <th className="py-2.5 px-3">Kode</th>
                  <th className="py-2.5 px-3">Satuan Kerja BP Batam</th>
                  <th className="py-2.5 px-2">Klaster</th>
                  <th className="py-2.5 px-2 text-right">Pagu DIPA</th>
                  <th className="py-2.5 px-2 text-right">Realisasi</th>
                  <th className="py-2.5 px-2 text-right">Serapan</th>
                  <th className="py-2.5 px-2 text-right">PNBP</th>
                  <th className="py-2.5 px-3">Output Kinerja Kunci</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                  <th className="py-2.5 px-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredSatkers.map((satker) => (
                  <tr key={satker.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        {satker.kode}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      <div>{satker.nama}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{satker.halamanPdf}</div>
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {satker.klaster}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                      Rp {satker.paguMiliar.toFixed(1)}M
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                      Rp {satker.realisasiMiliar.toFixed(1)}M
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold">
                      <span
                        className={
                          satker.serapanPersen >= 75
                            ? 'text-emerald-700'
                            : satker.serapanPersen >= 65
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }
                      >
                        {satker.serapanPersen.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-indigo-700 font-bold">
                      {satker.pnbpMiliar > 0 ? `Rp ${satker.pnbpMiliar.toFixed(1)}M` : '-'}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-600 max-w-xs truncate">
                      {satker.ikpIksUtama}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                          satker.statusKinerja === 'Tercapai'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : satker.statusKinerja === 'On Track'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            satker.statusKinerja === 'Tercapai'
                              ? 'bg-emerald-500'
                              : satker.statusKinerja === 'On Track'
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                        />
                        {satker.statusKinerja}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {onSelectUnit && (
                        <button
                          onClick={() => onSelectUnit(satker.id)}
                          className="p-1 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
                          title={`Buka Dashboard Satker ${satker.nama}`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SUB-VIEW 2: FOKUS DEDIKASI RUMAH SAKIT (RSBP) & PENGAMANAN ASET     */}
      {/* ==================================================================== */}
      {activeSubTab === 'rsbp_ditpam' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* CARD 1: BADAN USAHA RUMAH SAKIT (RSBP BATAM) */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                      BADAN USAHA RUMAH SAKIT (RSBP)
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">Buku Satu Data Hal. 19 - 21 (18 Dataset)</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  IKM 88,92 (Mutu A)
                </span>
              </div>

              {/* 4 Metrics RSBP */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">BOR Rawat Inap</span>
                  <span className="text-base font-black text-slate-900">76,2%</span>
                  <span className="text-[9px] text-emerald-600 block">Optimal 70-85%</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">Kunjungan Pasien</span>
                  <span className="text-base font-black text-slate-900">2.100</span>
                  <span className="text-[9px] text-blue-600 block">18 Klinik Poli</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">Realisasi PNBP</span>
                  <span className="text-base font-black text-emerald-700">Rp 3,29M</span>
                  <span className="text-[9px] text-slate-500 block">80,27% Capaian</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">Cost Recovery</span>
                  <span className="text-base font-black text-slate-900">111,4%</span>
                  <span className="text-[9px] text-emerald-600 block">Surplus BLU</span>
                </div>
              </div>

              {/* Dataset Kunci RSBP */}
              <div className="space-y-1.5 text-xs">
                <strong className="text-slate-800 block text-[11px]">Portofolio Dataset Layanan Kesehatan:</strong>
                <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                  <li><strong>Morbiditas Top 10 (DS-4):</strong> Hipertensi, DM Tipe 2, Jantung Koroner, ISPA, dan Trauma.</li>
                  <li><strong>Layanan Unggulan (DS-6):</strong> Laboratorium Kateterisasi Jantung (Cath Lab), Hemodialisa 24 mesin, Medical Check-Up KEK Kesehatan Sekupang.</li>
                  <li><strong>Resep Obat Generik (DS-17):</strong> Tingkat dispensing obat generik 84.5% dari formularium nasional RSBP.</li>
                  <li><strong>Sewa Tenant Medis (DS-14):</strong> 8 tenant vendor farmasi, optik, kantin higienis, dan laboratorium patologi.</li>
                </ul>
              </div>
            </div>

            {/* CARD 2: DIREKTORAT PENGAMANAN ASET DAN KAWASAN (DITPAM) */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                      PENGAMANAN ASET &amp; KAWASAN (DITPAM)
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">Buku Satu Data Hal. 17 - 19 (12 Dataset)</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  Response 12,4 Menit
                </span>
              </div>

              {/* 4 Metrics Ditpam */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">Penertiban Liar</span>
                  <span className="text-base font-black text-slate-900">874</span>
                  <span className="text-[9px] text-emerald-600 block">Dari 1.030 terdata</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">Personel Ditpam</span>
                  <span className="text-base font-black text-slate-900">524</span>
                  <span className="text-[9px] text-blue-600 block">4 Pos &amp; Patroli</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">Catchment Waduk</span>
                  <span className="text-base font-black text-slate-900">142 Ha</span>
                  <span className="text-[9px] text-emerald-600 block">Hutan Terlindungi</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 block">Objek Vital (Obvit)</span>
                  <span className="text-base font-black text-slate-900">7 Lokasi</span>
                  <span className="text-[9px] text-blue-600 block">100% Aman Terkendali</span>
                </div>
              </div>

              {/* Dataset Kunci Ditpam */}
              <div className="space-y-1.5 text-xs">
                <strong className="text-slate-800 block text-[11px]">Portofolio Dataset Keamanan &amp; Mitigasi:</strong>
                <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                  <li><strong>Penertiban Bangunan Liar (DS-1 &amp; DS-9):</strong> 874 penertiban tuntas di SWP Batam Kota, Batu Aji, dan Nongsa.</li>
                  <li><strong>Pengamanan Obvitnas (DS-10):</strong> Bandara Hang Nadim, Pelabuhan Batu Ampar, Waduk Duriangkang, Kabil, dan Batamindo.</li>
                  <li><strong>Penanganan Unjuk Rasa (DS-7):</strong> 42 aksi unjuk rasa ditangani persuasif tanpa korban atau kerusakan aset fisik.</li>
                  <li><strong>Bencana Alam &amp; Damkar (DS-4, 5, 6):</strong> 18 insiden kebakaran lahan padam dalam hitungan menit bersama 6 unit armada rescue.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SUB-VIEW 3: KATALOG SATU DATA BP BATAM HALAMAN 1 - 53                */}
      {/* ==================================================================== */}
      {activeSubTab === 'satu_data' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900">
                Pusat Standarisasi Data &amp; Metadata Satu Data BP Batam
              </h4>
              <p className="text-[11px] text-slate-500">
                Mengacu pada Keputusan Kepala BP Batam tentang Arsitektur Satu Data &amp; Interoperabilitas SPBE Nasional
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#002B49] text-cyan-300 font-mono text-xs font-bold">
              Total 53 Halaman PDF
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-mono text-[10px] text-slate-400 font-bold">HALAMAN 1 - 6</span>
              <h5 className="font-bold text-slate-900">Biro SDM, Hukum &amp; Keuangan</h5>
              <p className="text-slate-600 text-[11px]">
                Kenaikan Gaji Berkala, Sistem Merit, Peraturan BP Batam, Laporan Neraca BLU, PNBP, dan Piutang.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-mono text-[10px] text-slate-400 font-bold">HALAMAN 6 - 17</span>
              <h5 className="font-bold text-slate-900">Lahan, SPI, LLB, KEK, Bandara &amp; Pelabuhan</h5>
              <p className="text-slate-600 text-[11px]">
                SKPT Lahan, Kuota Barang, PMA/PMDN KEK, Arus Lalu Lintas Udara, dan Jasa Dermaga Batu Ampar.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-mono text-[10px] text-slate-400 font-bold">HALAMAN 17 - 28</span>
              <h5 className="font-bold text-slate-900">Ditpam, Rumah Sakit &amp; PTSP</h5>
              <p className="text-slate-600 text-[11px]">
                Bangunan Liar, Personel Obvitnas, BOR RSBP, Kunjungan Pasien, Perizinan SKKBM/SKKAB, dan MPP.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-mono text-[10px] text-slate-400 font-bold">HALAMAN 28 - 37</span>
              <h5 className="font-bold text-slate-900">BU SPAM, Fasilitas &amp; Lingkungan</h5>
              <p className="text-slate-600 text-[11px]">
                Air Baku 6 Waduk, WTP, KPLI Limbah B3, Rusunawa, Jaringan DMZ, dan Pemeliharaan Pipa.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-mono text-[10px] text-slate-400 font-bold">HALAMAN 38 - 46</span>
              <h5 className="font-bold text-slate-900">BOKMR, PDSI &amp; Biro Umum</h5>
              <p className="text-slate-600 text-[11px]">
                SAKIP, SPIP, Tier-3 Data Center (96 Rak), Fiber Optik, Aset BMN, dan Pengadaan Barang Jasa LPSE.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="font-mono text-[10px] text-slate-400 font-bold">HALAMAN 46 - 53</span>
              <h5 className="font-bold text-slate-900">Investasi, Pembangunan &amp; Perencanaan</h5>
              <p className="text-slate-600 text-[11px]">
                Pipeline Investor, ROW Utilitas &amp; Penghijauan, Ruas Jalan 542 Km, Kurva S, dan 43 Paket DED.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
