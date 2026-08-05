import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FolderGit2, 
  Award, 
  Zap,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { MonthlyMetric } from '../types/dashboard';

interface KpiCardsProps {
  metrics: MonthlyMetric[];
  totalProjectsCount: number;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics, totalProjectsCount }) => {
  const totalRevenue = metrics.reduce((acc, m) => acc + m.revenue, 0);
  const totalClients = metrics.reduce((acc, m) => acc + m.clients, 0);
  const monthlyProjectsSum = metrics.reduce((acc, m) => acc + m.projects, 0);
  
  const avgSatisfaction = metrics.length > 0
    ? (metrics.reduce((acc, m) => acc + m.satisfaction, 0) / metrics.length).toFixed(1)
    : '0';

  const maxSatisfactionObj = metrics.length > 0
    ? metrics.reduce((prev, curr) => (curr.satisfaction > prev.satisfaction ? curr : prev), metrics[0])
    : null;

  const firstMonth = metrics[0];
  const lastMonth = metrics[metrics.length - 1];

  let growthRate = 0;
  if (firstMonth && lastMonth && firstMonth.revenue > 0) {
    growthRate = Math.round(((lastMonth.revenue - firstMonth.revenue) / firstMonth.revenue) * 100);
  }

  const avgMonthlyRevenue = metrics.length > 0 ? Math.round(totalRevenue / metrics.length) : 0;
  const avgRevenuePerClient = totalClients > 0 ? Math.round(totalRevenue / totalClients) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-right">
      
      {/* Card 1: Total Revenue */}
      <div className="bg-[#0f1115] border border-white/10 hover:border-emerald-400/50 rounded-xl p-5 shadow-lg relative group transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="mono-label text-[10px]">// METRIC 01</span>
          <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <span className="text-xs font-bold text-slate-400 block mb-1">إجمالي الإيرادات السنوية</span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-mono-tech">
          {totalRevenue.toLocaleString('ar-SA')} <span className="text-sm font-normal text-emerald-400">ر.س</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 border-t border-white/5 pt-2.5 mt-2 font-mono-tech">
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>معدل النمو: </span>
          <span className="text-emerald-400 font-bold">+{growthRate}%</span>
          <span className="text-slate-400">مقارنة بأول شهر</span>
        </div>
      </div>

      {/* Card 2: Total Clients */}
      <div className="bg-[#0f1115] border border-white/10 hover:border-emerald-400/50 rounded-xl p-5 shadow-lg relative group transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="mono-label text-[10px]">// METRIC 02</span>
          <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <span className="text-xs font-bold text-slate-400 block mb-1">إجمالي العملاء المستفيدين</span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-mono-tech">
          {totalClients.toLocaleString('ar-SA')} <span className="text-sm font-normal text-slate-400">عميل</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-300 border-t border-white/5 pt-2.5 mt-2 font-mono-tech">
          <span>متوسط الإيراد للعميل:</span>
          <span className="text-emerald-400 font-bold">{avgRevenuePerClient.toLocaleString('ar-SA')} ر.س</span>
        </div>
      </div>

      {/* Card 3: Executed Projects */}
      <div className="bg-[#0f1115] border border-white/10 hover:border-emerald-400/50 rounded-xl p-5 shadow-lg relative group transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="mono-label text-[10px]">// METRIC 03</span>
          <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <FolderGit2 className="w-4 h-4" />
          </div>
        </div>
        <span className="text-xs font-bold text-slate-400 block mb-1">إجمالي حجم المشاريع المنفذة</span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-mono-tech">
          {monthlyProjectsSum} <span className="text-sm font-normal text-slate-400">مشروع شهري</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-300 border-t border-white/5 pt-2.5 mt-2 font-mono-tech">
          <span>دراسات الحالة الرئيسية:</span>
          <span className="text-emerald-400 font-bold">{totalProjectsCount} مشاريع نوعية</span>
        </div>
      </div>

      {/* Card 4: Customer Satisfaction */}
      <div className="bg-[#0f1115] border border-white/10 hover:border-emerald-400/50 rounded-xl p-5 shadow-lg relative group transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="mono-label text-[10px]">// METRIC 04</span>
          <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <span className="text-xs font-bold text-slate-400 block mb-1">معدل رضا العملاء الإجمالي</span>
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-mono-tech">
          {avgSatisfaction}<span className="text-sm font-normal text-emerald-400">%</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-300 border-t border-white/5 pt-2.5 mt-2 font-mono-tech">
          <span>الذروة:</span>
          <span className="text-emerald-400 font-bold">
            {maxSatisfactionObj ? `${maxSatisfactionObj.satisfaction}% (${maxSatisfactionObj.month})` : '-'}
          </span>
        </div>
      </div>

    </div>
  );
};
