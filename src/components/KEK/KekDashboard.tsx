import React, { useState, useMemo } from 'react';
import {
  KEK_INVESTASI_RAW,
  KEK_PROFIL_DATA,
  KEK_PERIZINAN_BERUSAHA,
  KEK_NON_PERIZINAN,
  KEK_PERIZINAN_LAINNYA,
  KEK_KAJIAN_DATA,
} from '../../data/kekData';
import { KekFilters } from './KekFilters';
import { KekKpiRow } from './KekKpiRow';
import { KekInvestasiJenisCard } from './KekInvestasiJenisCard';
import { KekPerizinanSheetSwap } from './KekPerizinanSheetSwap';
import { KekProfilCard } from './KekProfilCard';
import { KekKamusRumusView } from './KekKamusRumusView';
import { KekPerencanaanPipelineCard } from './KekPerencanaanPipelineCard';
import {
  PieChart,
  Layers,
  FileCheck2,
  Building2,
  TrendingUp,
  MapPin,
  FileSpreadsheet,
  Download,
  RotateCcw,
} from 'lucide-react';

interface KekDashboardProps {
  activeSubMenu?: string;
  onSelectSubMenu?: (sheetId: string) => void;
  onOpenExportModal?: () => void;
  onOpenFormulaModal: (formulaId: string) => void;
}

export const KekDashboard: React.FC<KekDashboardProps> = ({
  activeSubMenu = 'ikhtisar',
  onSelectSubMenu,
  onOpenExportModal,
  onOpenFormulaModal,
}) => {
  // Global Filters for KEK Dashboard
  const [selectedKek, setSelectedKek] = useState<string>('ALL');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('ALL');
  const [selectedJenisInvestasi, setSelectedJenisInvestasi] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const handleResetFilters = () => {
    setSelectedKek('ALL');
    setSelectedQuarter('ALL');
    setSelectedJenisInvestasi('ALL');
    setSelectedYear('2025');
  };

  // 1. Filtered Investasi Data (16 rows)
  const filteredInvestasi = useMemo(() => {
    return KEK_INVESTASI_RAW.filter((item) => {
      const matchKek =
        selectedKek === 'ALL' ||
        item.namaKek === selectedKek ||
        (selectedKek.includes('Pariwisata') && item.namaKek.includes('Pariwisata'));
      const matchQuarter =
        selectedQuarter === 'ALL' || item.triwulan.toString() === selectedQuarter;
      const matchJenis =
        selectedJenisInvestasi === 'ALL' || item.jenisInvestasi === selectedJenisInvestasi;
      const matchYear = item.tahun.toString() === selectedYear;

      return matchKek && matchQuarter && matchJenis && matchYear;
    });
  }, [selectedKek, selectedQuarter, selectedJenisInvestasi, selectedYear]);

  // Aggregate KPI Realisasi & Target Investasi
  const { totalRealisasi, totalTarget, capaianInvestasiPersen } = useMemo(() => {
    const realisasiSum = filteredInvestasi.reduce((sum, d) => sum + d.realisasiInvestasi, 0);

    // Target calculation: jika ALL, target tahunan ketiga KEK adalah Rp 4,352 T
    let targetBase = 4352000000000;
    if (selectedKek === 'KEK Nongsa') targetBase = 2835000000000;
    else if (selectedKek === 'KEK Batam Teknik') targetBase = 700000000000;
    else if (selectedKek.includes('Pariwisata')) targetBase = 817000000000;

    // Jika filter triwulan aktif (hanya 1 triwulan), target dibagi 4
    if (selectedQuarter !== 'ALL') {
      targetBase = targetBase / 4;
    }

    const capaian = targetBase > 0 ? (realisasiSum / targetBase) * 100 : 0;

    return {
      totalRealisasi: realisasiSum,
      totalTarget: targetBase,
      capaianInvestasiPersen: capaian,
    };
  }, [filteredInvestasi, selectedKek, selectedQuarter]);

  // Aggregate KPI Perizinan & Non-Perizinan
  const filteredPerizinanBerusahaCount = useMemo(() => {
    if (selectedKek === 'ALL') return KEK_PERIZINAN_BERUSAHA.length;
    return KEK_PERIZINAN_BERUSAHA.filter((d) =>
      d.kek.toLowerCase().includes(selectedKek.toLowerCase().replace('kek ', ''))
    ).length;
  }, [selectedKek]);

  const filteredNonPerizinanCount = useMemo(() => {
    if (selectedKek === 'ALL') return KEK_NON_PERIZINAN.length;
    return KEK_NON_PERIZINAN.filter((d) =>
      d.kek.toLowerCase().includes(selectedKek.toLowerCase().replace('kek ', ''))
    ).length;
  }, [selectedKek]);

  const filteredPerizinanLainnyaCount = useMemo(() => {
    if (selectedKek === 'ALL') return KEK_PERIZINAN_LAINNYA.length;
    return KEK_PERIZINAN_LAINNYA.filter((d) =>
      d.kek.toLowerCase().includes(selectedKek.toLowerCase().replace('kek ', ''))
    ).length;
  }, [selectedKek]);

  // Aggregate KPI Kajian Perkin
  const { totalDokumenAnalisis, totalDitindaklanjuti, capaianKajianPersen } = useMemo(() => {
    const totalDocs = KEK_KAJIAN_DATA.length;
    const ditindaklanjuti = KEK_KAJIAN_DATA.filter((d) => d.status === 'Ditindaklanjuti').length;
    const pct = totalDocs > 0 ? (ditindaklanjuti / totalDocs) * 100 : 0;
    return {
      totalDokumenAnalisis: totalDocs,
      totalDitindaklanjuti: ditindaklanjuti,
      capaianKajianPersen: pct,
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* 1. FILTERING PARAMETER YANG COCOK UNTUK DASHBOARD INI */}
      <KekFilters
        selectedKek={selectedKek}
        onChangeKek={setSelectedKek}
        selectedQuarter={selectedQuarter}
        onChangeQuarter={setSelectedQuarter}
        selectedJenisInvestasi={selectedJenisInvestasi}
        onChangeJenisInvestasi={setSelectedJenisInvestasi}
        selectedYear={selectedYear}
        onChangeYear={setSelectedYear}
        onResetFilters={handleResetFilters}
        filteredCount={filteredInvestasi.length}
        totalCount={KEK_INVESTASI_RAW.length}
      />

      {/* VIEW ROUTING BASED ON HEADER SUB-MENUS */}
      {activeSubMenu === 'kamus_rumus' ? (
        <KekKamusRumusView />
      ) : activeSubMenu === 'perencanaan_kek' ? (
        /* Focused view on Daftar Perencanaan & Pengusulan KEK (Dataset 5) */
        <div className="space-y-4">
          <KekKpiRow
            totalRealisasiInvestasi={totalRealisasi}
            totalTargetInvestasi={totalTarget}
            capaianInvestasiPersen={capaianInvestasiPersen}
            totalPerizinanBerusaha={filteredPerizinanBerusahaCount}
            totalNonPerizinan={filteredNonPerizinanCount}
            totalPerizinanLainnya={filteredPerizinanLainnyaCount}
            totalDokumenAnalisis={totalDokumenAnalisis}
            totalAnalisisDitindaklanjuti={totalDitindaklanjuti}
            capaianKajianPersen={capaianKajianPersen}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <KekPerencanaanPipelineCard
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      ) : activeSubMenu === 'investasi' ? (
        /* Focused view on Investment */
        <div className="space-y-4">
          <KekKpiRow
            totalRealisasiInvestasi={totalRealisasi}
            totalTargetInvestasi={totalTarget}
            capaianInvestasiPersen={capaianInvestasiPersen}
            totalPerizinanBerusaha={filteredPerizinanBerusahaCount}
            totalNonPerizinan={filteredNonPerizinanCount}
            totalPerizinanLainnya={filteredPerizinanLainnyaCount}
            totalDokumenAnalisis={totalDokumenAnalisis}
            totalAnalisisDitindaklanjuti={totalDitindaklanjuti}
            capaianKajianPersen={capaianKajianPersen}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <KekInvestasiJenisCard
            investasiList={filteredInvestasi}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      ) : activeSubMenu === 'sheet_swap' ? (
        /* Focused view on Perizinan Sheet Swap */
        <div className="space-y-4">
          <KekKpiRow
            totalRealisasiInvestasi={totalRealisasi}
            totalTargetInvestasi={totalTarget}
            capaianInvestasiPersen={capaianInvestasiPersen}
            totalPerizinanBerusaha={filteredPerizinanBerusahaCount}
            totalNonPerizinan={filteredNonPerizinanCount}
            totalPerizinanLainnya={filteredPerizinanLainnyaCount}
            totalDokumenAnalisis={totalDokumenAnalisis}
            totalAnalisisDitindaklanjuti={totalDitindaklanjuti}
            capaianKajianPersen={capaianKajianPersen}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <KekPerizinanSheetSwap
            selectedKekFilter={selectedKek}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      ) : activeSubMenu === 'profil_kek' ? (
        /* Focused view on KEK Profiles */
        <div className="space-y-4">
          <KekProfilCard
            selectedKek={selectedKek}
            onSelectKek={setSelectedKek}
            onOpenFormulaModal={onOpenFormulaModal}
          />
          <KekInvestasiJenisCard
            investasiList={filteredInvestasi}
            onOpenFormulaModal={onOpenFormulaModal}
          />
        </div>
      ) : (
        /* DEFAULT EXECUTIVE VIEW: CLEAN, ACCESSIBLE, HARMONIOUS */
        <div className="space-y-4">
          {/* A. 5 KPI METRICS ROW (Nilai Investasi & Perizinan KEK) */}
          <section id="kek-kpi-cards" aria-label="KPI Nilai Investasi dan Perizinan KEK">
            <KekKpiRow
              totalRealisasiInvestasi={totalRealisasi}
              totalTargetInvestasi={totalTarget}
              capaianInvestasiPersen={capaianInvestasiPersen}
              totalPerizinanBerusaha={filteredPerizinanBerusahaCount}
              totalNonPerizinan={filteredNonPerizinanCount}
              totalPerizinanLainnya={filteredPerizinanLainnyaCount}
              totalDokumenAnalisis={totalDokumenAnalisis}
              totalAnalisisDitindaklanjuti={totalDitindaklanjuti}
              capaianKajianPersen={capaianKajianPersen}
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>

          {/* B. DAFTAR PERENCANAAN / PENGUSULAN KEK (TABEL EKSEKUTIF BERSIH) */}
          <section id="kek-perencanaan-pipeline" aria-label="Daftar Perencanaan dan Pengusulan KEK">
            <KekPerencanaanPipelineCard
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>

          {/* C. INVESTASI BERDASARKAN JENIS (PMA vs PMDN) */}
          <section id="kek-investasi-jenis" aria-label="Investasi Berdasarkan Jenis PMA dan PMDN">
            <KekInvestasiJenisCard
              investasiList={filteredInvestasi}
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>

          {/* D. TABEL INFORMASI PERIZINAN (SHEET SWAP: PERIZINAN ADM, NON ADM, LAINNYA) */}
          <section id="kek-perizinan-sheet-swap" aria-label="Tabel Informasi Perizinan Sheet Swap">
            <KekPerizinanSheetSwap
              selectedKekFilter={selectedKek}
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>

          {/* E. PROFIL KAWASAN EKONOMI KHUSUS (KAWASAN, LOKASI, LUAS AREA, KEGIATAN) */}
          <section id="kek-profil-kawasan" aria-label="Profil Kawasan Ekonomi Khusus">
            <KekProfilCard
              selectedKek={selectedKek}
              onSelectKek={setSelectedKek}
              onOpenFormulaModal={onOpenFormulaModal}
            />
          </section>
        </div>
      )}
    </div>
  );
};
