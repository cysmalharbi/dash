import React, { useState } from 'react';
import { 
  Code, 
  FileCode, 
  Palette, 
  Sparkles, 
  Layers, 
  Server, 
  Cpu, 
  Database, 
  Figma, 
  GitBranch, 
  Gauge, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';
import { SKILLS } from '../data';
import { Skill, SkillCategory } from '../types';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categories: { id: SkillCategory; label: string }[] = [
    { id: 'all', label: 'كافة المهارات' },
    { id: 'frontend', label: 'تطوير الواجهات (Frontend)' },
    { id: 'backend', label: 'تطوير الخلفيات (Backend)' },
    { id: 'tools', label: 'أدوات والتصميم (Tools & UI)' },
  ];

  const filteredSkills = SKILLS.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5 text-blue-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-blue-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-rose-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Server': return <Server className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-rose-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Figma': return <Figma className="w-5 h-5 text-rose-400" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-blue-400" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-amber-400" />;
      default: return <Code className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBadgeColor = (label: Skill['proficiencyLabel']) => {
    switch (label) {
      case 'خبير':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'متقدم':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'متقن':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-right max-w-3xl mb-12">
          <span className="mono-label mb-2">// 03 TECHNICAL STACK</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-extrabold text-white mb-4">
            التقنيات ودرجة الإتقان
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            مؤشرات واضحة لدرجة إتقان الأدوات ولغات البرمجة المستعملة في بناء الواجهات السحابية.
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
              className={`bg-[#0f1115] border border-white/10 hover:border-emerald-400/40 rounded-xl p-6 text-right relative overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedSkill?.id === skill.id
                  ? 'border-emerald-400 bg-[#12141a]'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
                    {getSkillIcon(skill.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{skill.name}</h3>
                    <span className="text-[11px] font-mono-tech text-slate-400">// LEVEL PROFICIENCY</span>
                  </div>
                </div>
                
                <span className="px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border bg-emerald-400/10 text-emerald-400 border-emerald-400/30">
                  {skill.proficiencyLabel}
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between items-center text-xs font-mono-tech font-bold">
                  <span className="text-slate-300">درجة التمكّن:</span>
                  <span className="text-emerald-400">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/60 p-0.5 border border-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Highlights on detail expansion */}
              {skill.highlights && (
                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  {skill.highlights.map((h, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] font-mono-tech px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
