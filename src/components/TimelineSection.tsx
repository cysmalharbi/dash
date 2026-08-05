import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { EXPERIENCES } from '../data';

export const TimelineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'work' | 'education'>('all');

  const filteredItems = EXPERIENCES.filter(
    (item) => activeTab === 'all' || item.type === activeTab
  );

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-right max-w-3xl mb-12">
          <span className="mono-label mb-2">// 05 TIMELINE & EXPERIENCE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-extrabold text-white mb-4">
            الخبرات والمؤهلات العلمية
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            خط زمني يستعرض سنوات العطاء والتنقل بين المشاريع والمؤسسات التقنية الرائدة.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-start items-center gap-2 mb-12 font-mono-tech">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-emerald-400 text-black shadow-sm font-extrabold'
                : 'bg-[#0f1115] text-slate-300 hover:text-emerald-400 border border-white/10'
            }`}
          >
            الكل ({EXPERIENCES.length})
          </button>
          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'work'
                ? 'bg-emerald-400 text-black shadow-sm font-extrabold'
                : 'bg-[#0f1115] text-slate-300 hover:text-emerald-400 border border-white/10'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>الخبرات المهنية</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'education'
                ? 'bg-emerald-400 text-black shadow-sm font-extrabold'
                : 'bg-[#0f1115] text-slate-300 hover:text-emerald-400 border border-white/10'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>المؤهلات العلمية</span>
          </button>
        </div>

        {/* Timeline Line */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Central / Side Line */}
          <div className="absolute top-0 bottom-0 right-4 sm:right-1/2 w-px bg-white/10 -mr-0.5 sm:-mr-0.5" />

          <div className="space-y-12">
            {filteredItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Badge */}
                  <div className="absolute right-4 sm:right-1/2 translate-x-1/2 w-8 h-8 rounded-lg bg-[#0f1115] border border-emerald-400 flex items-center justify-center z-10">
                    {item.type === 'work' ? (
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>

                  {/* Content Glass Card */}
                  <div className={`w-full sm:w-1/2 pr-12 sm:pr-0 ${isEven ? 'sm:pl-10' : 'sm:pr-10'}`}>
                    <div className="bg-[#0f1115] border border-white/10 hover:border-emerald-400/40 rounded-xl p-6 text-right relative group transition-all duration-200">
                      
                      {/* Top Meta info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono-tech">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.yearRange}
                        </span>
                        
                        <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {item.location}
                        </span>
                      </div>

                      {/* Header Title & Organization */}
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                        {item.title}
                      </h3>
                      <h4 className="text-sm font-bold text-emerald-400 mb-4 font-mono-tech">
                        // {item.organization}
                      </h4>

                      {/* Description */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Key Achievements */}
                      {item.keyAchievements && item.keyAchievements.length > 0 && (
                        <div className="pt-3 border-t border-white/10 space-y-2">
                          <span className="text-xs font-mono-tech font-bold text-slate-200 block">// HIGHLIGHTS:</span>
                          {item.keyAchievements.map((ach, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
