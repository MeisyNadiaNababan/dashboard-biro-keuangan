import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  Clock,
  HelpCircle,
  AlertTriangle,
  Search,
} from 'lucide-react';
import { RS_TENANT_SEWA } from '../../data/rumahSakitData';

interface RumahSakitSewaTenantCardProps {
  onOpenFormulaModal?: (formulaId: string) => void;
}

export const RumahSakitSewaTenantCard: React.FC<RumahSakitSewaTenantCardProps> = ({
  onOpenFormulaModal,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredTenants = RS_TENANT_SEWA.filter((tenant) => {
    const matchesSearch =
      tenant.namaTenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.nomorPerjanjian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.lokasiGedung.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'aktif' && tenant.statusSewa === 'Aktif') ||
      (filterStatus === 'jatuh-tempo' && tenant.statusSewa === 'Mendekati Jatuh Tempo') ||
      (filterStatus === 'perpanjangan' && tenant.statusSewa === 'Proses Perpanjangan');

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      id="card-rsbp-sewa-tenant"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 font-sans flex flex-col justify-between"
    >
      {/* 1. Header with Title & Formula Button */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-amber-50 text-amber-700 border border-amber-200">
                  Dataset #14
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                  🏷️ Visualisasi: Status Grid Okupansi Tenant Komersial &amp; Tabel Rincian Sewa
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                Rekap Sewa Ruangan &amp; Fasilitas Komersial RSBP Batam (Dataset 14)
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  Atribut yang Ditampilkan: <strong>TAHUN</strong>, <strong>NAMA TENANT</strong>, <strong>LOKASI GEDUNG/LANTAI</strong>, <strong>LUAS AREA (M²)</strong>, <strong>TARIF SEWA</strong>, &amp; <strong>STATUS OKUPANSI</strong> (Hal. 74)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenFormulaModal && onOpenFormulaModal('rsbp_sewa_tenant')}
            className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-semibold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 self-start sm:self-center transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kepatuhan Sewa</span>
          </button>
        </div>

        {/* 2. Key Metrics BANs (Estimasi PNBP Sewa Dihapus Sesuai Instruksi) */}
        <div className="grid grid-cols-2 gap-2 my-2.5">
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">
              Total Tenant Aktif
            </span>
            <span className="text-base font-black text-slate-900">
              {RS_TENANT_SEWA.length} <span className="text-xs font-normal text-slate-500">Mitra</span>
            </span>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-2.5">
            <span className="text-[10px] text-amber-700 font-semibold block uppercase">
              Perlu Perhatian (H-60)
            </span>
            <span className="text-base font-black text-amber-800 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              2 Tenant Mendekati Jatuh Tempo
            </span>
          </div>
        </div>

        {/* 3. Search & Filter Bar */}
        <div className="flex items-center gap-2 mb-2">
          <div className="relative grow">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama tenant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:border-amber-400 text-slate-800"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-hidden cursor-pointer shrink-0"
          >
            <option value="ALL">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="jatuh-tempo">Mendekati Jatuh Tempo</option>
            <option value="perpanjangan">Perpanjangan</option>
          </select>
        </div>

        {/* 4. Simplified Tenant List: Name, Validity, Due Date Only */}
        <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1">
          {filteredTenants.length > 0 ? (
            filteredTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-amber-50/40 transition-colors text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 line-clamp-1">
                    {tenant.namaTenant}
                  </span>
                  <span
                    className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      tenant.statusSewa === 'Aktif'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : tenant.statusSewa === 'Mendekati Jatuh Tempo'
                        ? 'bg-amber-50 text-amber-700 border-amber-300 font-extrabold'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    {tenant.statusSewa}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Masa Berlaku: <strong className="text-slate-800">{tenant.masaBerlaku}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      Jatuh Tempo:{' '}
                      <strong className={tenant.sisaHari <= 45 ? 'text-amber-700 font-bold' : 'text-slate-800'}>
                        {tenant.jatuhTempo}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-lg">
              Tidak ada tenant yang sesuai dengan filter pencarian.
            </div>
          )}
        </div>
      </div>

      {/* 5. Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Pengelolaan Aset &amp; Fasilitas Komersial RSBP</span>
        <span className="font-mono text-[10px] text-slate-400">DS 14 Satu Data</span>
      </div>
    </div>
  );
};
