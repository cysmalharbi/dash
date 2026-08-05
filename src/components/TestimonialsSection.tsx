import React from 'react';
import { MessageSquare, Quote, Star, Building2, UserCheck } from 'lucide-react';
import { TestimonialRecord } from '../types/dashboard';

interface TestimonialsSectionProps {
  testimonials: TestimonialRecord[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <div className="space-y-6 text-right">
      
      {/* Header */}
      <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-xl flex items-center justify-between">
        <div>
          <span className="mono-label mb-1">// SHEET 03: TESTIMONIALS</span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>آراء وانطباعات القيادات التنفيذية ({testimonials.length})</span>
          </h2>
        </div>
        <span className="text-xs font-mono-tech text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/30">
          معدل الثقة: 100%
        </span>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-[#0f1115] border border-white/10 hover:border-emerald-400/40 rounded-xl p-6 flex flex-col justify-between shadow-lg relative group transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-emerald-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-emerald-400/20 group-hover:text-emerald-400/60 transition-colors" />
              </div>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {t.name}
                </h4>
                <p className="text-[11px] font-mono-tech text-slate-400">
                  {t.role} - <span className="text-emerald-400">{t.company}</span>
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
