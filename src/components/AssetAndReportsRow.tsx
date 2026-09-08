import React from 'react';
import { Package, Building, Anchor, Plane, Download } from 'lucide-react';
import { TableauShelvesBadge } from './TableauShelvesBadge';

interface AssetAndReportsRowProps {
  onOpenExportModal?: () => void;
}

export const AssetAndReportsRow: React.FC<AssetAndReportsRowProps> = ({ onOpenExportModal }) => {
  const assetBreakdown = [
    {
      sector: 'Sewa Lahan Industri & Komersial',
      realisasi: 'Rp 14,2 M',
      share: '49,8%',
      target: 'Rp 45,0 M',
      progress: 31.5,
      icon: Building,
      badge: 'Sektor Utama',
      note: 'Kontrak sewa kawasan Kabil, Batam Center & Batu Ampar',
      color: '#4E79A7',
    },
    {
      sector: 'Konsesi Pelabuhan Khusus & Dermaga',
      realisasi: 'Rp 8,9 M',
      share: '31,2%',
      target: 'Rp 35,0 M',
      progress: 25.4,
      icon: Anchor,
      badge: 'Kawasan Maritim',
      note: 'Terminal kargo & dermaga logistik terpadu',
      color: '#76B7B2',
    },
    {
      sector: 'Fasilitas Bandara Hang Nadim & Sarana',
      realisasi: 'Rp 5,4 M',
      share: '19,0%',
      target: 'Rp 20,0 M',
      progress: 27.0,
      icon: Plane,
      badge: 'Komersial Bandara',
      note: 'Konsesi kargo udara & sarana penunjang penerbangan',
      color: '#F28E2B',
    },
  ];

  return (
    <div id="aset-section" className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 space-y-4 font-sans select-none flex flex-col justify-between">
      <div className="space-y-4">
        {/* Modern Executive Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#B07AA1]" />
              <span>OPTIMALISASI ASET BLU</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#002B49] tracking-tight">
              Pemanfaatan Aset &amp; Konsesi Strategis
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Penerimaan sewa aset industri, dermaga logistik, dan konsesi bandara
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-2xs">
              <span className="text-[10px] text-slate-400 uppercase font-sans mr-1.5 font-bold">Target:</span>
              <span className="font-bold text-slate-800">Rp 100,0 M</span>
            </div>
            <div className="bg-[#EBF3E8] border border-[#59A14F]/40 rounded-xl px-3 py-1.5 shadow-2xs">
              <span className="text-[10px] text-slate-500 uppercase font-sans mr-1.5 font-bold">YTD:</span>
              <span className="font-bold text-[#2B542C]">Rp 28,5 M (28,5%)</span>
            </div>
          </div>
        </div>

        {/* Tableau Shelves Mapping Badge */}
        <TableauShelvesBadge
          showMe="Show Me #6 (Horizontal Bar) / #23 (Bullet Graph)"
          rows="[sektor] (Sektor Aset Industri/Pelabuhan/Bandara)"
          columns="SUM([realisasi]), SUM([target])"
          color="[sektor] (Warna Sektor)"
          detail="[note], [progress_persen]"
          referenceLine="SUM([target]) (Target Kontrak)"
        />

        {/* 3-Column Asset Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assetBreakdown.map((asset) => {
            return (
              <div
                key={asset.sector}
                className="p-4 border border-slate-200/80 rounded-xl bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 inline-block rounded-full"
                        style={{ backgroundColor: asset.color }}
                      />
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {asset.sector}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between font-mono my-1.5">
                    <span className="text-xl font-black text-slate-900">{asset.realisasi}</span>
                    <span className="text-xs font-bold text-slate-600">Porsi {asset.share}</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 my-1.5">
                    {asset.note}
                  </p>

                  {/* Bullet Progress */}
                  <div className="mt-3">
                    <div className="relative h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${asset.progress}%`,
                          backgroundColor: asset.color,
                        }}
                      />
                      {/* Reference line 50% target */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                        style={{ left: '50%' }}
                        title="Target Reference: 50%"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                      <span>Capaian: {asset.progress}%</span>
                      <span>Target: {asset.target}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-bold uppercase text-slate-500">
                  <span>Klasifikasi</span>
                  <span className="text-slate-800 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full shadow-2xs font-mono">{asset.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footnote */}
      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>Evaluasi: Potensi sewa jangka panjang lahan komersial Batam Center mencapai Rp 30 M pada Semester II.</span>
        <button
          onClick={onOpenExportModal}
          className="text-[#002B49] hover:underline font-bold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Laporan Crosstab Aset</span>
        </button>
      </div>
    </div>
  );
};
