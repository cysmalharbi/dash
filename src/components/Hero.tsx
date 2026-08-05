import React from 'react';
import { 
  ArrowLeft, 
  Send, 
  Award, 
  FolderGit2, 
  Star, 
  Zap, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { PERSONAL_INFO, STAT_BADGES } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-blue-400" />;
      case 'FolderGit2': return <FolderGit2 className="w-6 h-6 text-rose-400" />;
      case 'Star': return <Star className="w-6 h-6 text-amber-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Hero Content Text */}
          <div className="lg:col-span-7 text-right flex flex-col items-start">
            
            {/* Mono label */}
            <span className="mono-label mb-3">// 01 INITIALIZATION</span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-syne font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              نصمّم ونبتكر <br />
              <span className="text-emerald-400 italic">
                واجهات زجاجية
              </span>
              <br />
              عالية الأداء
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              أنا <strong className="text-emerald-400 font-bold">{PERSONAL_INFO.name}</strong>، متخصص في هندسة الواجهات المعقدة والتطبيقات التفاعلية. أجمع بين الرؤية التصميمية والأكواد النظيفة لبناء تجارب رقمية استثنائية.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('projects')}
                className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg text-sm font-bold uppercase transition-all duration-200 btn-accent cursor-pointer"
              >
                <span>معرض الأعمال</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg text-sm font-bold text-emerald-400 bg-transparent border border-emerald-400/50 hover:border-emerald-400 hover:bg-emerald-400/10 transition-all duration-200 cursor-pointer"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>تواصل معي</span>
              </button>
            </div>

            {/* Stat Badges Grid */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden my-4">
              <div className="bg-[#0b0c10] p-4 text-right hover:bg-[#12141a] transition-colors">
                <span className="mono-label">EXP.YEARS</span>
                <div className="font-syne text-3xl font-extrabold text-white mt-1">+6</div>
                <p className="text-xs text-slate-400 mt-1">سنوات خبرة</p>
              </div>
              <div className="bg-[#0b0c10] p-4 text-right hover:bg-[#12141a] transition-colors">
                <span className="mono-label">COMPLETED.PRJ</span>
                <div className="font-syne text-3xl font-extrabold text-white mt-1">+38</div>
                <p className="text-xs text-slate-400 mt-1">مشروع منجز</p>
              </div>
              <div className="bg-[#0b0c10] p-4 text-right hover:bg-[#12141a] transition-colors">
                <span className="mono-label">CLIENT.SAT</span>
                <div className="font-syne text-3xl font-extrabold text-white mt-1">100%</div>
                <p className="text-xs text-slate-400 mt-1">تقييم أداء</p>
              </div>
              <div className="bg-[#0b0c10] p-4 text-right hover:bg-[#12141a] transition-colors">
                <span className="mono-label">CODE.EFFICIENCY</span>
                <div className="font-syne text-3xl font-extrabold text-white mt-1">99.8</div>
                <p className="text-xs text-slate-400 mt-1">مؤشر السرعة</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/10 w-full mt-4">
              <span className="text-xs font-mono-tech text-slate-400 ml-3">// CONNECT:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-[#0f1115] hover:bg-emerald-400/20 border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-emerald-400 transition-all cursor-pointer"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-[#0f1115] hover:bg-emerald-400/20 border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-emerald-400 transition-all cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-[#0f1115] hover:bg-emerald-400/20 border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-emerald-400 transition-all cursor-pointer"
                title="Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-lg bg-[#0f1115] hover:bg-emerald-400/20 border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-emerald-400 transition-all cursor-pointer"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Sidebar - The Technical Shell */}
          <div className="lg:col-span-5 relative w-full">
            <aside className="border border-white/10 bg-[#0f1115] rounded-xl p-6 flex flex-col gap-6 shadow-2xl">
              <div>
                <div className="mono-label mb-2">// SYSTEM CONFIG</div>
                <div className="font-mono-tech text-xs text-slate-300 p-4 bg-black/40 border border-white/10 rounded-lg leading-relaxed text-left dir-ltr">
                  <span className="text-emerald-400">const</span> engineer = &#123;<br />
                  &nbsp;&nbsp;name: <span className="text-amber-300">'عبد الله الشمري'</span>,<br />
                  &nbsp;&nbsp;role: <span className="text-amber-300">'Frontend Architect'</span>,<br />
                  &nbsp;&nbsp;location: <span className="text-amber-300">'Riyadh, SA'</span>,<br />
                  &nbsp;&nbsp;stack: [<span className="text-emerald-300">'React'</span>, <span className="text-emerald-300">'Next.js'</span>, <span className="text-emerald-300">'TS'</span>]<br />
                  &#125;
                </div>
              </div>

              <div>
                <div className="mono-label mb-2">// AVAILABILITY</div>
                <div className="p-3 border border-emerald-400/50 rounded-lg text-emerald-400 text-xs font-mono-tech font-bold text-center bg-emerald-400/5 flex items-center justify-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{PERSONAL_INFO.availability} 🟢</span>
                </div>
              </div>

              <div>
                <div className="mono-label mb-2">// QUICK SHORTCUTS</div>
                <div className="grid grid-cols-4 gap-2 font-mono-tech text-xs">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="aspect-square border border-white/10 rounded-lg flex items-center justify-center hover:border-emerald-400 hover:text-emerald-400 transition-colors">GH</a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="aspect-square border border-white/10 rounded-lg flex items-center justify-center hover:border-emerald-400 hover:text-emerald-400 transition-colors">LN</a>
                  <a href={PERSONAL_INFO.twitter} target="_blank" rel="noreferrer" className="aspect-square border border-white/10 rounded-lg flex items-center justify-center hover:border-emerald-400 hover:text-emerald-400 transition-colors">X</a>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="aspect-square border border-white/10 rounded-lg flex items-center justify-center hover:border-emerald-400 hover:text-emerald-400 transition-colors">EM</a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full btn-accent py-3 rounded-lg text-xs font-mono-tech uppercase font-black tracking-wider cursor-pointer"
                >
                  تواصل مباشر
                </button>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </section>
  );
};
