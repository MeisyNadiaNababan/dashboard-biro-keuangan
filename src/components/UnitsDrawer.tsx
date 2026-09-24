import React, { useState, useMemo } from 'react';
import { X, Search, CheckCircle2, ArrowRight, Building2, Server, Users, Scale, ShieldAlert, Building, ClipboardCheck, Compass, CheckSquare, Target, MapPin, ShieldCheck, Truck, PieChart, Plane, Anchor, Briefcase, Ship, Shield, TrendingUp, HardHat, DraftingCompass, Stethoscope, Droplets, BookOpen, Layers, Award } from 'lucide-react';
import { BP_BATAM_24_UNITS, BpBatamUnit } from '../data/bpBatamUnits';

interface UnitsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Server,
  Users,
  Scale,
  ShieldAlert,
  Building,
  ClipboardCheck,
  Compass,
  CheckSquare,
  Target,
  MapPin,
  ShieldCheck,
  Truck,
  PieChart,
  Plane,
  Anchor,
  Briefcase,
  Ship,
  Shield,
  TrendingUp,
  HardHat,
  DraftingCompass,
  Stethoscope,
  Droplets,
  Award,
};

export const UnitsDrawer: React.FC<UnitsDrawerProps> = ({
  isOpen,
  onClose,
  activeUnitId,
  onSelectUnit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'active' | 'on_progress' | 'ready_to_build'>('ALL');

  const categories = ['ALL', 'Pimpinan', 'Biro', 'Direktorat', 'Pusat', 'Badan Usaha', 'Satuan'];

  // Realtime dynamic metrics computed from actual unit definitions
  const totalUnits = BP_BATAM_24_UNITS.length;
  const activeUnits = useMemo(() => BP_BATAM_24_UNITS.filter((u) => u.status === 'active'), []);
  const onProgressUnits = useMemo(() => BP_BATAM_24_UNITS.filter((u) => u.status === 'on_progress'), []);
  const readyUnits = useMemo(() => BP_BATAM_24_UNITS.filter((u) => u.status === 'ready_to_build'), []);
  const activeCount = activeUnits.length;
  const onProgressCount = onProgressUnits.length;
  const readyCount = readyUnits.length;

  const filteredUnits = useMemo(() => {
    return BP_BATAM_24_UNITS.filter((unit) => {
      const matchSearch =
        !searchTerm ||
        unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'ALL' || unit.category === selectedCategory;
      const matchStatus = statusFilter === 'ALL' || unit.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [searchTerm, selectedCategory, statusFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs font-sans select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-white border border-slate-300 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden rounded-xl">
        {/* Top Header */}
        <div className="bg-[#0F1E36] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-sm shadow-xs border border-blue-400/30">
              {totalUnits}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight">
                  Direktori 24 Unit Kerja BP Batam
                </h3>
                <span className="text-[10.5px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {activeCount} Dashboard Aktif (Realtime)
                </span>
                {onProgressCount > 0 && (
                  <span className="text-[10.5px] font-bold px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/50 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    {onProgressCount} On Progress
                  </span>
                )}
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-900/60 border border-blue-400/40 text-blue-200 rounded hidden md:inline">
                  BP_Batam_KPI_Dictionary_Updated.pdf
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Monitoring status operasional: <span className="text-emerald-300 font-semibold">{activeCount} Unit Dashboard Aktif</span>, <span className="text-amber-300 font-semibold">{onProgressCount} Unit On Progress</span> &amp; <span className="text-slate-300">{readyCount} Unit Tahap Pengembangan</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari unit kerja, biro, direktorat, kode, atau kata kunci..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Status Quick Filter (Realtime) */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  statusFilter === 'ALL'
                    ? 'bg-[#1F3864] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                Semua ({totalUnits})
              </button>

              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                  statusFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Aktif ({activeCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('on_progress')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                  statusFilter === 'on_progress'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>On Progress ({onProgressCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('ready_to_build')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                  statusFilter === 'ready_to_build'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                Siap Rancang ({readyCount})
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs pt-1 border-t border-slate-200/60">
            <span className="text-[11px] font-semibold text-slate-500 mr-1 shrink-0">Kategori:</span>
            {categories.map((cat) => {
              const count = cat === 'ALL'
                ? BP_BATAM_24_UNITS.length
                : BP_BATAM_24_UNITS.filter((u) => u.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'ALL' ? 'Semua Kategori' : cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Units Grid */}
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-100/60">
          {filteredUnits.map((unit) => {
            const IconComponent = ICON_MAP[unit.iconName] || Building2;
            const isActive = activeUnitId === unit.id;
            const isImplemented = unit.status === 'active';
            const isOnProgress = unit.status === 'on_progress';

            return (
              <div
                key={unit.id}
                onClick={() => {
                  onSelectUnit(unit.id);
                  onClose();
                }}
                className={`p-3.5 bg-white border rounded-xl transition-all cursor-pointer group flex flex-col justify-between relative hover:shadow-md ${
                  isActive
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs'
                            : isImplemented
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isOnProgress
                            ? 'bg-amber-50 text-amber-700 border border-amber-300'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-600'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {unit.code}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">
                            {unit.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {unit.name}
                        </h4>
                      </div>
                    </div>

                    {/* Status Pill */}
                    {isImplemented ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1 shrink-0 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Aktif
                      </span>
                    ) : isOnProgress ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1 shrink-0 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        On Progress
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                        Siap Rancang
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {unit.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="font-mono font-semibold text-blue-800">
                      {unit.itemCount} Item Data
                    </span>
                    <span>•</span>
                    <span className="text-[10px] text-slate-400">
                      {unit.pdfPages}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    <span>{isImplemented || isOnProgress ? 'Buka Dashboard' : 'Lihat Katalog'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer - Realtime Active Count */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-bold text-slate-800">
              Total: {totalUnits} Unit Kerja Resmi BP Batam
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{activeCount} Unit Aktif</span>
            </span>
            {onProgressCount > 0 && (
              <span className="text-amber-800 font-bold flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-300 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>{onProgressCount} Unit On Progress</span>
              </span>
            )}
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-500 font-medium text-[11px]">
              {readyCount} Unit Siap Rancang
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter(statusFilter === 'active' ? 'ALL' : 'active')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'active'
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>{statusFilter === 'active' ? 'Tampilkan Semua' : `Filter ${activeCount} Unit Aktif`}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-300 cursor-pointer transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
