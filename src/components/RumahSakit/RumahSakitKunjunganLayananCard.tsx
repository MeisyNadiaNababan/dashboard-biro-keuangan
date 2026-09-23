import React, { useState } from 'react';
import {
  Users,
  HeartPulse,
  CreditCard,
  Layers,
  HelpCircle,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  RS_KUNJUNGAN_TOTAL,
  RS_KUNJUNGAN_LAYANAN,
  RS_LAYANAN_UNGGULAN,
  RS_CARA_BAYAR,
  RsKunjunganLayanan,
} from '../../data/rumahSakitData';

interface RumahSakitKunjunganLayananCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const RumahSakitKunjunganLayananCard: React.FC<RumahSakitKunjunganLayananCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [activeTab, setActiveTab] = useState<'layanan' | 'unggulan' | 'cara_bayar'>('layanan');
  const [selectedLayanan, setSelectedLayanan] = useState<string>(RS_KUNJUNGAN_LAYANAN[0].bagianLayanan);

  const currentLayananData =
    RS_KUNJUNGAN_LAYANAN.find((l) => l.bagianLayanan === selectedLayanan) || RS_KUNJUNGAN_LAYANAN[0];

  return (
    <div
      id="card-rsbp-kunjungan-layanan"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 font-sans flex flex-col justify-between"
    >
      {/* 1. Header with Title & Tab Switcher */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-purple-50 text-purple-700 border border-purple-200">
                  Dataset #5 &amp; #6
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                  🏷️ Visualisasi: Grouped Bar Chart Tren Kunjungan Rawat &amp; Donut Distribusi Cara Bayar
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                Kunjungan Pasien Berdasarkan Bagian Layanan &amp; Unggulan
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>BAGIAN/POLIKLINIK</strong>, <strong>JUMLAH KUNJUNGAN</strong>, <strong>CARA BAYAR (BPJS/UMUM/ASURANSI)</strong>, &amp; <strong>STATUS TINDAKAN</strong> (Hal. 66–68)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-center">
            {/* View switcher */}
            <div className="bg-slate-100 p-0.5 rounded-lg flex items-center text-xs">
              <button
                onClick={() => setActiveTab('layanan')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'layanan'
                    ? 'bg-white text-purple-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bagian Layanan (DS 5)
              </button>
              <button
                onClick={() => setActiveTab('unggulan')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'unggulan'
                    ? 'bg-white text-rose-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Layanan Unggulan (DS 6)
              </button>
              <button
                onClick={() => setActiveTab('cara_bayar')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  activeTab === 'cara_bayar'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cara Bayar
              </button>
            </div>

            <button
              onClick={() => onOpenFormulaModal && onOpenFormulaModal('rsbp_kunjungan')}
              className="p-1.5 text-slate-400 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
              title="Lihat Formula & Kamus Satu Data"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Top Metric Banner */}
        <div className="my-2.5 p-2.5 bg-gradient-to-r from-purple-50 via-slate-50 to-rose-50 rounded-lg border border-purple-100/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              Total Pasien Terlayani (YTD 2026)
            </span>
            <div className="text-xl font-black text-slate-900 leading-tight">
              {RS_KUNJUNGAN_TOTAL.toLocaleString('id-ID')}{' '}
              <span className="text-xs font-semibold text-slate-500">Pasien</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-semibold block">
              Pusat Rujukan Batam & KEK
            </span>
            <span className="text-xs font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
              Rata-rata 15.385 Pasien / Bln
            </span>
          </div>
        </div>

        {/* 3. TAB CONTENT */}
        {activeTab === 'layanan' && (
          <div>
            <div className="text-[11px] text-slate-500 font-medium mb-2 flex items-center justify-between">
              <span>Pilih Bagian Layanan untuk Rincian Kunjungan:</span>
              <span className="text-purple-700 font-semibold">Atribut: Jenis Kunjungan & Cara Bayar</span>
            </div>

            {/* List of 5 main service sections */}
            <div className="space-y-1.5 mb-3">
              {RS_KUNJUNGAN_LAYANAN.map((layanan) => {
                const isSelected = selectedLayanan === layanan.bagianLayanan;
                return (
                  <div
                    key={layanan.bagianLayanan}
                    onClick={() => setSelectedLayanan(layanan.bagianLayanan)}
                    className={`p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50/70 border-purple-300 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isSelected ? 'bg-purple-600 ring-2 ring-purple-200' : 'bg-slate-400'
                          }`}
                        />
                        <span className="font-bold text-slate-800 line-clamp-1">
                          {layanan.bagianLayanan}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 font-mono">
                        <span className="font-bold text-slate-900">
                          {layanan.jumlahKunjungan.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                          {layanan.persentase.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drilldown Box for the Selected Service */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80 mb-2">
                <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-purple-600" />
                  Rincian Atribut Satu Data: {currentLayananData.bagianLayanan}
                </span>
                <span className="text-[10px] text-slate-500 font-mono italic">
                  {currentLayananData.keterangan}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Kunjungan Baru</span>
                  <span className="font-bold text-slate-800 font-mono text-xs">
                    {currentLayananData.kunjunganBaru.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Kunjungan Lama</span>
                  <span className="font-bold text-slate-800 font-mono text-xs">
                    {currentLayananData.kunjunganLama.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Laki-Laki / Pria</span>
                  <span className="font-bold text-blue-700 font-mono text-xs">
                    {currentLayananData.pria.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="bg-white p-1.5 rounded border border-slate-200">
                  <span className="text-slate-500 block">Perempuan / Wanita</span>
                  <span className="font-bold text-rose-700 font-mono text-xs">
                    {currentLayananData.wanita.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'unggulan' && (
          <div>
            <div className="text-[11px] text-slate-500 font-medium mb-2 flex items-center justify-between">
              <span>6 Layanan Unggulan RSBP Batam (Dataset No. 6):</span>
              <span className="text-rose-700 font-bold">Total: 38.450 Kasus</span>
            </div>
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {RS_LAYANAN_UNGGULAN.map((unggul) => (
                <div
                  key={unggul.id}
                  className="bg-slate-50 hover:bg-rose-50/40 border border-slate-200/80 rounded-lg p-2 text-xs transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <HeartPulse className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span className="font-bold text-slate-800 line-clamp-1">
                        {unggul.namaLayanan}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-slate-900">
                        {unggul.jumlahKasus.toLocaleString('id-ID')} Kasus
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5" />+{unggul.pertumbuhanYoy}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="line-clamp-1 italic">{unggul.keunggulanTeknis}</span>
                    <span className="font-mono font-bold text-purple-700 shrink-0 ml-1">
                      {unggul.persentase.toFixed(1)}% Pangsa
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cara_bayar' && (
          <div>
            <div className="text-[11px] text-slate-500 font-medium mb-2">
              Distribusi Cara Bayar Pasien RSBP Batam (Dataset No. 5):
            </div>
            <div className="space-y-2.5 mb-3">
              {RS_CARA_BAYAR.map((cb) => (
                <div
                  key={cb.nama}
                  className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cb.color }}
                      />
                      <span className="font-semibold text-slate-800">{cb.nama}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-slate-900">
                        {cb.jumlah.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        ({cb.persen.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1.5 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${cb.persen}%`, backgroundColor: cb.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-[11px] text-blue-800">
              <strong>Catatan Direktur:</strong> Portofolio BPJS Kesehatan (65,9%) tetap menjadi tulang punggung volume pasien, diimbangi oleh segmen asuransi swasta/perusahaan industri (22,4%) yang mendongkrak margin penerimaan non-kapitasi.
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Sumber: SIMRS & Buku Register Pasien BP Batam</span>
        <span className="font-mono text-[10px] text-slate-400">DS 5 & 6 Terintegrasi</span>
      </div>
    </div>
  );
};
