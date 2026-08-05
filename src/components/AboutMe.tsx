import React from 'react';
import { Target, Lightbulb, Code2, Clock, UserCheck, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, WORK_PILLARS } from '../data';

export const AboutMe: React.FC = () => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-7 h-7 text-blue-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-7 h-7 text-rose-400" />;
      case 'Code2':
        return <Code2 className="w-7 h-7 text-blue-400" />;
      case 'Clock':
        return <Clock className="w-7 h-7 text-rose-400" />;
      default:
        return <Sparkles className="w-7 h-7 text-blue-400" />;
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-right max-w-3xl mb-12">
          <span className="mono-label mb-2">// 02 MISSION</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-extrabold text-white mb-4">
            الفن يلتقي بالتكنولوجيا
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            في عالم البرمجة اليوم، لا يكفي أن يكون الكود شغالاً فحسب، بل يجب أن يكون ممتعاً في الاستخدام. أعمل وفق فلسفة "الجمالية الزجاجية المجدية"، حيث نعتمد التأثيرات التفاعلية الملساء مع الالتزام التام بمعايير السرعة.
          </p>
        </div>

        {/* Top Featured About Glass Card */}
        <div className="bg-[#0f1115] border border-white/10 rounded-xl p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-right">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                رؤيتي في الهندسة البرمجية وتصميم الواجهات
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                في عالم البرمجة اليوم، لا يكفي أن يكون الكود شغالاً فحسب، بل يجب أن يكون ممتعاً في الاستخدام، سريع الاستجابة، وسهل الصيانة للأجيال القادمة من المطورين. 
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                أعمل وفق فلسفة <strong className="text-emerald-400">"الجمالية الزجاجية المجدية"</strong>، حيث نعتمد التأثيرات التفاعلية الملساء مع الالتزام التام بمعايير السرعة، التوافق التام مع اتجاه اليمين إلى اليسار (RTL)، وسهولة الوصول (Accessibility).
              </p>
              
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10 font-mono-tech text-xs">
                <div>
                  <span className="text-slate-400 block">// LOCATION</span>
                  <span className="text-white font-semibold">{PERSONAL_INFO.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">// STACK</span>
                  <span className="text-white font-semibold">TypeScript, React, Node</span>
                </div>
                <div>
                  <span className="text-slate-400 block">// ARCHITECTURE</span>
                  <span className="text-white font-semibold">Glassmorphism & RTL</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-lg bg-black/40 border border-white/10 text-center">
              <div className="w-16 h-16 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">ضمان الجودة والاحترافية</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                التزام كامل بالمقاييس العالمية لكتابة كود TypeScript نظيف، وااختبارات الأداء التنافسية.
              </p>
            </div>

          </div>
        </div>

        {/* 4 Work Pillars Grid */}
        <div className="mb-6 text-right">
          <h3 className="text-xl font-bold text-white mb-2">ركائز ومميزات العمل الأساسية</h3>
          <p className="text-sm text-slate-400">القواعد التي تبنى عليها كافة مشاريعنا البرمجية والتصميمية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="glass-card glass-card-hover rounded-2xl p-6 text-right flex flex-col justify-between relative group"
            >
              <div>
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 w-fit mb-5 group-hover:border-blue-500/40 transition-colors">
                  {getPillarIcon(pillar.iconName)}
                </div>
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {pillar.title}
                </h4>
                <span className="text-[11px] font-mono text-rose-400 block mb-3 dir-ltr text-right">
                  {pillar.subtitle}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>معيار أساسي</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-rose-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
