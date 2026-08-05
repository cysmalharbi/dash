import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, TrendingUp, Calendar, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Dark Glass Backdrop */}
      <div
        className="fixed inset-0 bg-[#090d16]/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/15 shadow-2xl bg-[#0f1115] z-10 text-right animate-in zoom-in-95 duration-300 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-lg bg-black/60 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/40 transition-all cursor-pointer z-20"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image inside Modal */}
        <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-8 border border-white/10 shadow-xl group bg-black">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent" />
          
          {/* Floating Category & Year Badges */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono-tech">
            <span className="px-3 py-1 rounded bg-black/80 text-emerald-400 text-xs font-bold border border-emerald-400/40">
              {project.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded bg-white/10 text-slate-300 text-xs font-mono">
              {project.year}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="space-y-6">
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              {project.title}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Metric Highlight Box */}
          {project.metrics && (
            <div className="p-4 rounded-lg bg-black/50 border border-emerald-400/30 flex items-start gap-3">
              <div className="p-2 rounded bg-emerald-400/10 text-emerald-400 mt-0.5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono-tech font-bold text-emerald-400 block">// IMPACT & METRICS:</span>
                <p className="text-sm font-semibold text-white mt-0.5">{project.metrics}</p>
              </div>
            </div>
          )}

          {/* Key Features & Highlights */}
          <div>
            <h3 className="text-sm font-mono-tech font-bold text-slate-300 uppercase mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              // KEY HIGHLIGHTS & FEATURES:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((h, index) => (
                <div key={index} className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200 leading-normal">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-mono-tech font-bold text-slate-400 mb-2.5">// TECH STACK:</h4>
            <div className="flex flex-wrap gap-2 font-mono-tech">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-black/50 border border-white/10 text-emerald-400 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono-tech">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase btn-accent cursor-pointer"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-slate-200 bg-black/40 hover:bg-slate-800 border border-white/10 transition-all cursor-pointer"
              >
                <span>GitHub Source</span>
                <Github className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              [ ESC ] إغلاق
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
