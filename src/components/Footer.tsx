import React from 'react';
import { ArrowUp, Code2, Heart, Github, Linkedin, Twitter } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0b0c10] border-t border-white/10 pt-16 pb-12 overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-center">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2 font-mono-tech">
              <span className="text-xl font-extrabold tracking-tight text-white">
                ABDULLAH<span className="text-emerald-400">.SYS</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              تطوير وبناء الواجهات السحابية المعقدة بنمط تقني حديث وبأعلى مقاييس الجودة والأداء.
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono-tech uppercase font-bold text-slate-300">
            <button onClick={() => onNavigate('hero')} className="hover:text-emerald-400 transition-colors cursor-pointer">// HOME</button>
            <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">// ABOUT</button>
            <button onClick={() => onNavigate('skills')} className="hover:text-emerald-400 transition-colors cursor-pointer">// SKILLS</button>
            <button onClick={() => onNavigate('projects')} className="hover:text-emerald-400 transition-colors cursor-pointer">// PROJECTS</button>
            <button onClick={() => onNavigate('experience')} className="hover:text-emerald-400 transition-colors cursor-pointer">// TIMELINE</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer">// CONTACT</button>
          </div>

          {/* Social Icons */}
          <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-2 font-mono-tech">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-[#0f1115] border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/40 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-[#0f1115] border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/40 transition-all cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-[#0f1115] border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/40 transition-all cursor-pointer"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom copyright & scroll top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono-tech">
          <p className="flex items-center gap-1.5">
            <span>جميع الحقوق محفوظة © 2026 م. عبد الله الشمري.</span>
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0f1115] hover:bg-emerald-400 hover:text-black border border-white/10 text-slate-300 transition-all cursor-pointer shadow-lg uppercase text-[11px] font-bold"
          >
            <span>[ TOP ]</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
