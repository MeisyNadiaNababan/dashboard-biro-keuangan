import React, { useState } from 'react';
import {
  Building2,
  FileText,
  Table as TableIcon,
  BarChart3,
  Layers,
  MapPin,
  CheckCircle2,
  ListOrdered,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from 'lucide-react';
import {
  PERUSAHAAN_KBLI_DATA,
  PERSYARATAN_LAYANAN_DATA,
} from '../../data/laluLintasBarangData';
import { LlbVisualHeader } from './LlbVisualHeader';
import { LlbDatasetSourceBadge } from './LlbDatasetSourceBadge';
import { TableauShelvesBadge } from '../TableauShelvesBadge';

type SubTab = 'kbli' | 'persyaratan';

interface LlbKbliKawasanCardProps {
  onOpenFormulaModal?: (metricId: string) => void;
}

export const LlbKbliKawasanCard: React.FC<LlbKbliKawasanCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [subTab, setSubTab] = useState<SubTab>('kbli');
  const [displayMode, setDisplayMode] = useState<'chart' | 'table'>('chart');
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-4 shadow-2xs">
      {/* 1. Standardized Visual Header */}
      <LlbVisualHeader
        datasetNumber={subTab === 'kbli' ? 5 : 1}
        pdfPages={subTab === 'kbli' ? 'Hal. 9' : 'Hal. 8'}
        classification={subTab === 'kbli' ? 'TERBATAS' : 'TERBUKA'}
        periode={subTab === 'kbli' ? 'PERBULAN' : 'JIKA UPDATE'}
        title={
          subTab === 'kbli'
            ? 'DATA KBLI PERUSAHAAN YANG MEMILIKI IZIN USAHA KAWASAN'
            : 'NAMA IZIN DOKUMEN PERSYARATAN DAN ALUR PROSES PERMOHONAN LAYANAN/PERIZINAN'
        }
        visualName={
          subTab === 'kbli'
            ? 'Tabel & Matriks Klasifikasi KBLI Pengembang Kawasan Industri'
            : 'Diagram Alur Proses & Portofolio Dokumen Persyaratan Layanan'
        }
        attributes={
          subTab === 'kbli'
            ? ['NO', 'NAMA PERUSAHAAN', 'NO IZIN USAHA KAWASAN', 'ALAMAT', 'KBLI']
            : ['ID', 'URAIAN IZIN', 'PERSYARATAN']
        }
        onOpenFormula={() => onOpenFormulaModal?.(`llb-${subTab}`)}
        rightControls={
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={() => setDisplayMode('chart')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  displayMode === 'chart'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                <span>Grafis</span>
              </button>
              <button
                onClick={() => setDisplayMode('table')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  displayMode === 'table'
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3 h-3" />
                <span>Tabel</span>
              </button>
            </div>

            <button
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                showFormulaDetails
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Tampilkan Rumus & Calculated Field Kawasan"
            >
              <HelpCircle className="w-3 h-3 text-amber-600" />
              <span>Formula</span>
              {showFormulaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        }
      />

      {/* 2. Sub-Tab Switcher: KBLI vs Persyaratan */}
      <div className="flex items-center gap-2 mt-2.5 pt-0.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('kbli')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            subTab === 'kbli'
              ? 'bg-[#1F4E79] text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Building2 className="w-3 h-3" />
          <span>KBLI Perusahaan Izin Usaha Kawasan (Item #5)</span>
        </button>
        <button
          onClick={() => setSubTab('persyaratan')}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            subTab === 'persyaratan'
              ? 'bg-[#1F4E79] text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-3 h-3" />
          <span>Alur &amp; Persyaratan Dokumen Izin (Item #1)</span>
        </button>
      </div>

      {/* 3. Collapsible Formula Box */}
      {showFormulaDetails && (
        <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-lg my-2 text-xs text-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-amber-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              Kalkulasi Kerapatan Kawasan &amp; Legalitas IUK
            </span>
            {onOpenFormulaModal && (
              <button
                onClick={() => onOpenFormulaModal('llb_izin_kawasan')}
                className="text-[#1F4E79] hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Detail DLLB-05</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[10.5px]">
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// Total Izin Usaha Kawasan Aktif</span>
              <code className="text-blue-900 font-bold">
                COUNTD(IF [Status] = &apos;Aktif Beroperasi&apos; THEN [No IUK] END)
              </code>
            </div>
            <div className="bg-white p-2 rounded border border-amber-200">
              <span className="text-slate-500 block mb-0.5">// Luas Lahan Terkelola (Hektar)</span>
              <code className="text-emerald-700 font-bold">
                SUM([Luas Lahan M2]) / 10000
              </code>
            </div>
          </div>
        </div>
      )}

      {/* 4. Dataset Source Explanation Badge */}
      {subTab === 'kbli' ? (
        <div className="my-2 space-y-1.5">
          <TableauShelvesBadge
            showMe="Show Me #1 (Matrix Table &amp; Treemap Luas Kawasan)"
            columns="[Nama Perusahaan], [KBLI], SUM([Luas Lahan M2])"
            rows="[No Izin Usaha Kawasan], [Alamat]"
            filters="[Status]='Aktif', [Sifat Data]='TERBATAS'"
            detail="Visualisasi Standar Profil Kawasan Industri Terdaftar di BP Batam"
          />
          <LlbDatasetSourceBadge
            itemNumber="5"
            datasetName="Data KBLI Perusahaan Kawasan (Izin Usaha Kawasan)"
            sifatData="TERBATAS"
            periodeData="PER BULAN"
            pdfRef="Halaman 9 (No. 5)"
            atributList={[
              'NO',
              'NAMA PERUSAHAAN',
              'NO IZIN USAHA KAWASAN',
              'ALAMAT',
              'KBLI',
            ]}
          />
        </div>
      ) : (
        <div className="my-2 space-y-1.5">
          <TableauShelvesBadge
            showMe="Show Me #1 (Table Layout Matrix Persyaratan SOP)"
            columns="[ID], [Uraian Izin], [Standar Waktu Jam]"
            rows="[Alur Proses], [Persyaratan]"
            filters="[Status SOP]='Berlaku', [Sifat]='TERBUKA'"
            detail="Katalog Standar Operasional Prosedur Pelayanan Perizinan Lalu Lintas Barang"
          />
          <LlbDatasetSourceBadge
            itemNumber="1"
            datasetName="Data Persyaratan dan Waktu Izin Usaha Kawasan, Pemasukan, dan Pengeluaran Barang"
            sifatData="TERBUKA"
            periodeData="JIKA UPDATE"
            pdfRef="Halaman 8 (No. 1)"
            atributList={[
              'NO PENDAFTARAN',
              'URAIAN IZIN',
              'PERSYARATAN',
              'ALUR PROSES',
              'WAKTU',
            ]}
          />
        </div>
      )}

      {/* 5. CONTENT: KBLI TAB */}
      {subTab === 'kbli' && (
        <div className="mt-2.5 space-y-2.5">
          {displayMode === 'chart' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {PERUSAHAAN_KBLI_DATA.map((item) => (
                <div
                  key={item.no}
                  className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs hover:border-[#1F4E79] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.2 rounded bg-blue-50 text-[#1F4E79] font-mono font-bold text-[9.5px] border border-blue-200">
                            #{item.no}
                          </span>
                          <h5 className="text-xs font-bold text-slate-900">{item.namaPerusahaan}</h5>
                        </div>
                        <span className="text-[10.5px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="line-clamp-1">{item.alamat}</span>
                        </span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {item.statusOperasional}
                      </span>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded p-2 mb-2">
                      <span className="text-[10px] text-slate-500 font-mono block">No Izin Usaha Kawasan (IUK):</span>
                      <span className="text-[11px] font-mono font-bold text-[#1F4E79]">{item.noIzinUsahaKawasan}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-600 block mb-1">KBLI Terdaftar:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.kbli.split(',').map((code) => (
                        <span
                          key={code.trim()}
                          className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[9.5px] border border-slate-200"
                        >
                          {code.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <div className="overflow-x-auto max-h-[260px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#0B1728] text-white text-[10.5px] font-semibold sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">No</th>
                      <th className="py-2 px-2.5">Nama Perusahaan Kawasan</th>
                      <th className="py-2 px-2.5">No Izin Usaha Kawasan</th>
                      <th className="py-2 px-2.5">Lokasi &amp; Alamat</th>
                      <th className="py-2 px-2.5">KBLI Terdaftar</th>
                      <th className="py-2 px-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                    {PERUSAHAAN_KBLI_DATA.map((row) => (
                      <tr key={row.no} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-2.5 font-mono text-slate-500 font-bold">#{row.no}</td>
                        <td className="py-2 px-2.5 font-bold text-slate-900">{row.namaPerusahaan}</td>
                        <td className="py-2 px-2.5 font-mono font-semibold text-[#1F4E79] text-[10.5px]">
                          {row.noIzinUsahaKawasan}
                        </td>
                        <td className="py-2 px-2.5 text-slate-600 max-w-[200px] text-[10.5px]">{row.alamat}</td>
                        <td className="py-2 px-2.5">
                          <div className="flex flex-wrap gap-1 max-w-[220px]">
                            {row.kbli.split(',').map((c) => (
                              <span
                                key={c.trim()}
                                className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono text-[9px] border border-slate-200"
                              >
                                {c.trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-2 px-2.5 text-center whitespace-nowrap">
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {row.statusOperasional}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. CONTENT: PERSYARATAN TAB */}
      {subTab === 'persyaratan' && (
        <div className="mt-2.5 space-y-2.5">
          {displayMode === 'chart' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {PERSYARATAN_LAYANAN_DATA.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs hover:border-[#1F4E79] transition-all"
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[9.5px]">
                      {item.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Standar: &le;{item.standarWaktuJam} Jam
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-900 mb-1.5">{item.uraianIzin}</h5>

                  <div className="text-[10.5px] text-slate-600 mb-2 bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="font-semibold text-slate-800 block mb-0.5">Alur Proses Pelayanan:</span>
                    <p className="font-mono text-[10px] text-slate-700 leading-snug">{item.alurProses}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800 text-[10.5px] block mb-0.5">Persyaratan Dokumen:</span>
                    <ul className="space-y-0.5 text-[10px] text-slate-600 list-disc list-inside">
                      {item.persyaratan.map((req, idx) => (
                        <li key={idx} className="truncate" title={req}>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <div className="overflow-x-auto max-h-[260px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#0B1728] text-white text-[10.5px] font-semibold sticky top-0 z-10">
                    <tr>
                      <th className="py-2 px-2.5">ID</th>
                      <th className="py-2 px-2.5">Uraian Izin Dokumen</th>
                      <th className="py-2 px-2.5">Kategori</th>
                      <th className="py-2 px-2.5">Persyaratan Utama</th>
                      <th className="py-2 px-2.5">Alur Proses Permohonan</th>
                      <th className="py-2 px-2.5 text-center">Standar Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-[11px]">
                    {PERSYARATAN_LAYANAN_DATA.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 px-2.5 font-mono font-bold text-[#1F4E79]">{row.id}</td>
                        <td className="py-2 px-2.5 font-bold text-slate-900 max-w-[180px]">{row.uraianIzin}</td>
                        <td className="py-2 px-2.5">
                          <span className="px-1.5 py-0.2 rounded text-[9.5px] font-semibold bg-slate-100 text-slate-700">
                            {row.kategori}
                          </span>
                        </td>
                        <td className="py-2 px-2.5 max-w-[220px] text-[10.5px] text-slate-600">
                          {row.persyaratan.join(', ')}
                        </td>
                        <td className="py-2 px-2.5 font-mono text-[10px] text-slate-600 max-w-[200px]">
                          {row.alurProses}
                        </td>
                        <td className="py-2 px-2.5 text-center font-mono font-bold text-teal-700 whitespace-nowrap">
                          {row.standarWaktuJam} Jam
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. STRATEGIC EXECUTIVE INSIGHT & REKOMENDASI BOX */}
      <div className="mt-3 p-2.5 bg-blue-50/60 border-l-4 border-[#1F4E79] rounded-r-lg text-xs text-slate-800 flex items-start gap-2">
        <Lightbulb className="w-3.5 h-3.5 text-[#1F4E79] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-900 uppercase tracking-wider text-[10.5px]">
              Wawasan Klaster Kawasan Industri &amp; Simplifikasi Dokumen
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800 font-mono">
              34 Kawasan Aktif (1.420 Ha)
            </span>
          </div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            Dominasi KBLI 68130 (Kawasan Industri) dan 68111 (Real Estat Lahan Industri) mempertegas peran sentral IUK dalam menjaga kepatuhan zonasi KPBPBB Batam. Digitalisasi alur pendaftaran 4 langkah mampu memangkas waktu verifikasi berkas menjadi rata-rata 3,5 jam.
          </p>
          <div className="text-[10px] font-mono text-slate-600 pt-0.5">
            <strong>Rekomendasi Kebijakan:</strong> Sinkronisasikan NIB perusahaan pengelola kawasan dengan geospasial masterplan BP Batam untuk mempercepat terbitnya izin perluasan lahan baru.
          </div>
        </div>
      </div>
    </div>
  );
};
