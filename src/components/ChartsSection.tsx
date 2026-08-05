import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  BarChart,
  PieChart,
  Pie,
  Cell,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { MonthlyMetric, ProjectRecord } from '../types/dashboard';
import { TrendingUp, Users, Award, PieChart as PieIcon } from 'lucide-react';

interface ChartsSectionProps {
  metrics: MonthlyMetric[];
  projects: ProjectRecord[];
  activeMetric: 'revenue' | 'clients' | 'projects' | 'satisfaction';
}

const SECTOR_COLORS = ['#4ade80', '#3b82f6', '#f43f5e', '#a855f7', '#eab308', '#06b6d4'];

// Custom Tooltip for Arabic Formatting
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0c10]/95 border border-white/20 p-3 rounded-lg shadow-2xl text-right text-xs font-mono-tech space-y-1 z-50">
        <p className="font-bold text-emerald-400 border-b border-white/10 pb-1 mb-1">
          // {label}
        </p>
        {payload.map((entry: any, index: number) => {
          let unit = '';
          let val = entry.value;
          if (entry.name === 'الإيرادات' || entry.dataKey === 'revenue') {
            unit = ' ر.س';
            val = Number(val).toLocaleString('ar-SA');
          } else if (entry.name === 'الرضا' || entry.dataKey === 'satisfaction') {
            unit = '%';
          } else if (entry.name === 'العملاء' || entry.dataKey === 'clients') {
            unit = ' عميل';
          } else if (entry.name === 'المشاريع' || entry.dataKey === 'projects') {
            unit = ' مشروع';
          }

          return (
            <p key={`item-${index}`} style={{ color: entry.color }} className="flex items-center justify-between gap-3">
              <span>{entry.name}:</span>
              <span className="font-bold">{val}{unit}</span>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export const ChartsSection: React.FC<ChartsSectionProps> = ({ metrics, projects, activeMetric }) => {

  // Prepare sector distribution data
  const sectorCounts: { [key: string]: number } = {};
  projects.forEach((p) => {
    sectorCounts[p.sector] = (sectorCounts[p.sector] || 0) + 1;
  });

  const sectorPieData = Object.keys(sectorCounts).map((sector) => ({
    name: sector,
    value: sectorCounts[sector]
  }));

  // Prepare Quarterly Summary data for bar chart
  const qData = [
    {
      quarter: 'الربع 1',
      revenue: metrics.slice(0, 3).reduce((acc, m) => acc + m.revenue, 0),
      clients: metrics.slice(0, 3).reduce((acc, m) => acc + m.clients, 0),
    },
    {
      quarter: 'الربع 2',
      revenue: metrics.slice(3, 6).reduce((acc, m) => acc + m.revenue, 0),
      clients: metrics.slice(3, 6).reduce((acc, m) => acc + m.clients, 0),
    },
    {
      quarter: 'الربع 3',
      revenue: metrics.slice(6, 9).reduce((acc, m) => acc + m.revenue, 0),
      clients: metrics.slice(6, 9).reduce((acc, m) => acc + m.clients, 0),
    },
    {
      quarter: 'الربع 4',
      revenue: metrics.slice(9, 12).reduce((acc, m) => acc + m.revenue, 0),
      clients: metrics.slice(9, 12).reduce((acc, m) => acc + m.clients, 0),
    }
  ];

  return (
    <div className="space-y-6 text-right">
      
      {/* Upper Grid: Main Composed Growth Chart + Sector Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Chart: Revenue & Projects Trend */}
        <div className="lg:col-span-8 bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="mono-label mb-1">// CHART 01</span>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>مسار الإيرادات وحجم المشاريع الشهرية</span>
              </h3>
            </div>
            <span className="text-xs font-mono-tech text-slate-400 bg-black/40 px-2.5 py-1 rounded border border-white/5">
              12 شهر
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={metrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#4ade80" fontSize={11} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} formatter={(value) => <span className="text-xs text-slate-300 font-mono-tech">{value}</span>} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" name="الإيرادات" stroke="#4ade80" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Bar yAxisId="right" dataKey="projects" name="المشاريع" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Distribution Pie Chart */}
        <div className="lg:col-span-4 bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <span className="mono-label mb-1">// CHART 02</span>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              <span>توزيع المشاريع حسب القطاع</span>
            </h3>
            <p className="text-slate-400 text-xs mb-3">
              تحليل تنوع القطاعات في سجل الأعمال
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sectorPieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} stroke="#0f1115" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-tech border-t border-white/5 pt-3">
            {sectorPieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SECTOR_COLORS[index % SECTOR_COLORS.length] }} />
                <span>{entry.name}:</span>
                <span className="font-bold text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lower Grid: Clients vs Revenue + Customer Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Clients vs Revenue Bar Chart */}
        <div className="lg:col-span-6 bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="mono-label mb-1">// CHART 03</span>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>ارتباط نمو العملاء مع الإيرادات</span>
              </h3>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#4ade80" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} formatter={(value) => <span className="text-xs text-slate-300 font-mono-tech">{value}</span>} />
                <Bar dataKey="clients" name="العملاء" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Satisfaction Index Line Chart */}
        <div className="lg:col-span-6 bg-[#0f1115] border border-white/10 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="mono-label mb-1">// CHART 04</span>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>مؤشر رضا العملاء (% Satisfaction)</span>
              </h3>
            </div>
            <span className="text-xs font-mono-tech text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              المعدل: 97%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[90, 100]} stroke="#f43f5e" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} formatter={(value) => <span className="text-xs text-slate-300 font-mono-tech">{value}</span>} />
                <Line type="monotone" dataKey="satisfaction" name="الرضا" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
