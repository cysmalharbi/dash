import React, { useState } from 'react';
import { 
  FolderGit2, 
  Building2, 
  Calendar, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Search,
  ExternalLink,
  X
} from 'lucide-react';
import { ProjectRecord } from '../types/dashboard';

interface ProjectsAnalyticsProps {
  projects: ProjectRecord[];
  selectedSector: string;
  setSelectedSector: (s: string) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

export const ProjectsAnalytics: React.FC<ProjectsAnalyticsProps> = ({
  projects,
  selectedSector,
  setSelectedSector,
  searchTerm,
  setSearchTerm
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectRecord | null>(null);

  // Extract unique sectors & years
  const sectors = Array.from(new Set(projects.map(p => p.sector)));
  const years = Array.from(new Set<number>(projects.map(p => Number(p.year)))).sort((a, b) => b - a);

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchesSector = selectedSector === 'ALL' || p.sector === selectedSector;
    const matchesYear = selectedYear === 'ALL' || String(p.year) === selectedYear;
    const matchesSearch = 
      p.name.includes(searchTerm) ||
      p.client.includes(searchTerm) ||
      p.description.includes(searchTerm) ||
      p.result.includes(searchTerm);
    return matchesSector && matchesYear && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right">
      
      {/* Header & Filter Toolbar */}
      <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <span className="mono-label mb-1">// SHEET 02: PROJECTS</span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-emerald-400" />
            <span>سجل دراسات الحالة والمشاريع النوعية ({filteredProjects.length})</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
          {/* Sector Buttons */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setSelectedSector('ALL')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedSector === 'ALL' ? 'bg-emerald-400 text-black font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              جميع القطاعات
            </button>
            {sectors.map(sec => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  selectedSector === sec ? 'bg-emerald-400 text-black font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Year Buttons */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setSelectedYear('ALL')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                selectedYear === 'ALL' ? 'bg-emerald-400 text-black font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              جميع السنوات
            </button>
            {years.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(String(yr))}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  selectedYear === String(yr) ? 'bg-emerald-400 text-black font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#0f1115] border border-white/10 rounded-xl p-12 text-center text-slate-400 font-mono-tech">
          لا توجد نتائج تطابق خيارات التصفية الحالية.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProjectModal(p)}
              className="bg-[#0f1115] border border-white/10 hover:border-emerald-400/50 rounded-xl p-5 shadow-lg hover:shadow-emerald-400/10 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Card Badges Header */}
                <div className="flex items-center justify-between mb-3 font-mono-tech">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 text-[11px] font-bold border border-emerald-400/30">
                    {p.sector}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 text-[11px]">
                    {p.year}
                  </span>
                </div>

                {/* Project Title & Client */}
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  {p.name}
                </h3>
                <p className="text-xs font-mono-tech text-slate-400 flex items-center gap-1.5 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>العميل: {p.client}</span>
                </p>

                {/* Description */}
                <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                  {p.description}
                </p>
              </div>

              {/* Impact / Result Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono-tech">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>{p.result}</span>
                </div>
                <span className="text-[11px] font-mono-tech text-slate-500 group-hover:text-white transition-colors">
                  التفاصيل ←
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal View for Project Detail */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0f1115] border border-white/20 rounded-xl p-6 max-w-lg w-full text-right space-y-4 shadow-2xl relative font-sans">
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-4 left-4 p-1.5 rounded-lg bg-black/40 text-slate-400 hover:text-white border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 font-mono-tech">
              <span className="px-2.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 text-xs font-bold border border-emerald-400/30">
                {selectedProjectModal.sector}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white/10 text-slate-300 text-xs">
                سنة التنفيذ: {selectedProjectModal.year}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {selectedProjectModal.name}
            </h3>

            <div className="p-3 rounded-lg bg-black/50 border border-white/10 space-y-1 text-xs font-mono-tech">
              <p className="text-slate-400">// الجهة المستفيدة / العميل:</p>
              <p className="text-sm font-bold text-white">{selectedProjectModal.client}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono-tech font-bold text-slate-400 mb-1">// نطاق العمل والوصف التفصيلي:</h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                {selectedProjectModal.description}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono-tech font-bold text-emerald-400 block">// النتيجة والأثر المحقق:</span>
                <p className="text-sm font-bold text-white mt-0.5">{selectedProjectModal.result}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedProjectModal(null)}
              className="w-full py-2.5 rounded-lg bg-emerald-400 text-black font-mono-tech font-extrabold text-xs uppercase cursor-pointer"
            >
              إغلاق النافذة
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
