import React from 'react';
import { Sparkles, TrendingUp, Target, Lightbulb, ShieldCheck, Zap } from 'lucide-react';
import { MonthlyMetric, ProjectRecord } from '../types/dashboard';

interface InsightsPanelProps {
  metrics: MonthlyMetric[];
  projects: ProjectRecord[];
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ metrics, projects }) => {
  if (metrics.length === 0) return null;

  // 1. Calculate Peak Month
  const peakMonth = metrics.reduce((max, m) => (m.revenue > max.revenue ? m : max), metrics[0]);
  
  // 2. Calculate Growth Rate
  const firstRev = metrics[0].revenue;
  const lastRev = metrics[metrics.length - 1].revenue;
  const totalGrowthPercent = firstRev > 0 ? Math.round(((lastRev - firstRev) / firstRev) * 100) : 0;

  // 3. Best Satisfaction Month
  const peakSat = metrics.reduce((max, m) => (m.satisfaction > max.satisfaction ? m : max), metrics[0]);

  // 4. Sector breakdown
  const sectorCounts: { [key: string]: number } = {};
  projects.forEach(p => {
    sectorCounts[p.sector] = (sectorCounts[p.sector] || 0) + 1;
  });
  const topSector = Object.keys(sectorCounts).sort((a, b) => sectorCounts[b] - sectorCounts[a])[0] || 'عام';

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-xl text-right space-y-4">
      
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div>
          <span className="mono-label mb-0.5">// AUTOMATED INTELLIGENCE</span>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>التحليلات والتوصيات الاستراتيجية المؤتمتة</span>
          </h3>
        </div>
        <span className="text-[11px] font-mono-tech text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
          تحليل فوري
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-tech">
        
        {/* Insight 1 */}
        <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span>ذروة الأداء المالي</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            حقق شهر <strong className="text-white">{peakMonth.month}</strong> أعلى إيراد شهري بقيمة <strong className="text-emerald-400">{peakMonth.revenue.toLocaleString('ar-SA')} ر.س</strong> مع <strong className="text-white">{peakMonth.clients} عميل</strong>.
          </p>
        </div>

        {/* Insight 2 */}
        <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Zap className="w-4 h-4" />
            <span>مسار النمو السنوي</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            ارتفعت الإيرادات بنسبة إجمالية بلغت <strong className="text-emerald-400">+{totalGrowthPercent}%</strong> من بداية المسار في {metrics[0].month} حتى {metrics[metrics.length - 1].month}.
          </p>
        </div>

        {/* Insight 3 */}
        <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>القطاع القيادي والرضا</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            قطاع <strong className="text-white">{topSector}</strong> تصدر المشاريع المنفذة، وتوج الرضا بأقصى نسبة في <strong className="text-emerald-400">{peakSat.month} ({peakSat.satisfaction}%)</strong>.
          </p>
        </div>

      </div>

    </div>
  );
};
