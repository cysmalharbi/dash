import React from 'react';
import { Filter, Search, Calendar, RefreshCw } from 'lucide-react';
import { QuarterFilter } from '../types/dashboard';

interface QuarterFilterBarProps {
  quarter: QuarterFilter;
  setQuarter: (q: QuarterFilter) => void;
  activeMetric: 'revenue' | 'clients' | 'projects' | 'satisfaction';
  setActiveMetric: (m: 'revenue' | 'clients' | 'projects' | 'satisfaction') => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  selectedSector: string;
  setSelectedSector: (s: string) => void;
  allSectors: string[];
}

export const QuarterFilterBar: React.FC<QuarterFilterBarProps> = ({
  quarter,
  setQuarter,
  activeMetric,
  setActiveMetric,
  searchTerm,
  setSearchTerm,
  selectedSector,
  setSelectedSector,
  allSectors
}) => {
  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-4 shadow-md text-right font-mono-tech space-y-4">
      
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Quarter Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 ml-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>النطاق الزمني:</span>
          </span>

          <button
            onClick={() => setQuarter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              quarter === 'ALL'
                ? 'bg-emerald-400 text-black font-extrabold shadow-sm'
                : 'bg-black/40 text-slate-300 hover:text-emerald-400 border border-white/10'
            }`}
          >
            السنة كاملة
          </button>

          <button
            onClick={() => setQuarter('Q1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              quarter === 'Q1'
                ? 'bg-emerald-400 text-black font-extrabold shadow-sm'
                : 'bg-black/40 text-slate-300 hover:text-emerald-400 border border-white/10'
            }`}
          >
            Q1 (يناير - مارس)
          </button>

          <button
            onClick={() => setQuarter('Q2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              quarter === 'Q2'
                ? 'bg-emerald-400 text-black font-extrabold shadow-sm'
                : 'bg-black/40 text-slate-300 hover:text-emerald-400 border border-white/10'
            }`}
          >
            Q2 (أبريل - يونيو)
          </button>

          <button
            onClick={() => setQuarter('Q3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              quarter === 'Q3'
                ? 'bg-emerald-400 text-black font-extrabold shadow-sm'
                : 'bg-black/40 text-slate-300 hover:text-emerald-400 border border-white/10'
            }`}
          >
            Q3 (يوليو - سبتمبر)
          </button>

          <button
            onClick={() => setQuarter('Q4')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              quarter === 'Q4'
                ? 'bg-emerald-400 text-black font-extrabold shadow-sm'
                : 'bg-black/40 text-slate-300 hover:text-emerald-400 border border-white/10'
            }`}
          >
            Q4 (أكتوبر - ديسمبر)
          </button>
        </div>

        {/* Metric Focus Toggle */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-xs font-bold text-slate-400 ml-1">المؤشر البؤري:</span>
          
          <button
            onClick={() => setActiveMetric('revenue')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              activeMetric === 'revenue'
                ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/50'
                : 'bg-black/30 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            الإيرادات (SAR)
          </button>

          <button
            onClick={() => setActiveMetric('clients')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              activeMetric === 'clients'
                ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/50'
                : 'bg-black/30 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            العملاء
          </button>

          <button
            onClick={() => setActiveMetric('projects')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              activeMetric === 'projects'
                ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/50'
                : 'bg-black/30 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            المشاريع
          </button>

          <button
            onClick={() => setActiveMetric('satisfaction')}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              activeMetric === 'satisfaction'
                ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/50'
                : 'bg-black/30 text-slate-400 border border-white/5 hover:text-slate-200'
            }`}
          >
            معدل الرضا %
          </button>
        </div>

      </div>

      {/* Second Line: Sector Dropdown & Search Input */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-white/5">
        {/* Sector Filter */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-400 shrink-0">القطاع:</span>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-black/60 border border-white/10 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:border-emerald-400 outline-none font-sans"
          >
            <option value="ALL">جميع القطاعات</option>
            {allSectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:flex-1 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث في المشاريع والشهادات أو الأشهر..."
            className="w-full pr-9 pl-4 py-1.5 rounded-lg bg-black/60 border border-white/10 text-white placeholder-slate-500 text-xs focus:border-emerald-400 outline-none transition-all font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute left-2.5 top-2 text-slate-400 hover:text-white text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
