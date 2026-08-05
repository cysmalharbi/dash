import React, { useState } from 'react';
import { FolderGit2, ExternalLink, ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'كافة المشاريع' },
    { id: 'web', label: 'تطبيقات الويب' },
    { id: 'mobile', label: 'تطبيقات الهواتف' },
    { id: 'uiux', label: 'تصميم UI/UX' },
    { id: 'ai', label: 'الذكاء الاصطناعي' },
  ];

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-right max-w-3xl mb-12">
          <span className="mono-label mb-2">// 04 RECENT PROJECTS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-extrabold text-white mb-4">
            أحدث الابتكارات الرقمية
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            مجموعة مختارة من المنصات والتطبيقات التي تم إنشاؤها وفق أعلى معايير الجودة والأداء.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-10 font-mono-tech">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-400 text-black shadow-sm font-extrabold'
                  : 'bg-[#0f1115] text-slate-300 hover:text-emerald-400 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#0f1115] border border-white/10 hover:border-emerald-400/50 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-200"
            >
              <div>
                {/* Card Thumbnail */}
                <div className="relative h-52 w-full overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent opacity-90" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 font-mono-tech">
                    <span className="px-2.5 py-1 rounded bg-black/80 text-emerald-400 text-[10px] font-bold border border-emerald-400/30">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-3 left-3 font-mono-tech">
                    <span className="px-2 py-1 rounded bg-white/10 text-slate-300 text-[10px]">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 text-right space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono-tech">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-black/50 text-slate-300 border border-white/10 text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 text-[10px]">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0 text-right">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-black/40 hover:bg-emerald-400 hover:text-black text-slate-200 border border-white/10 transition-all duration-200 text-xs font-mono-tech font-bold uppercase cursor-pointer group/btn"
                >
                  <span>عرض التفاصيل الكاملة</span>
                  <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover/btn:text-black group-hover/btn:-translate-x-1 transition-all" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Window */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
