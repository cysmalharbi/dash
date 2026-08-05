import React from 'react';
import { 
  BarChart3, 
  FileSpreadsheet, 
  Upload, 
  Download, 
  RotateCcw, 
  Briefcase, 
  MessageSquare, 
  LayoutDashboard,
  PieChart,
  Sparkles,
  FileCheck
} from 'lucide-react';

interface DashboardNavbarProps {
  activeTab: 'overview' | 'charts' | 'projects' | 'testimonials' | 'editor';
  setActiveTab: (tab: 'overview' | 'charts' | 'projects' | 'testimonials' | 'editor') => void;
  onExportExcel: () => void;
  onUploadClick: () => void;
  onResetData: () => void;
  isModified: boolean;
  totalRevenue: number;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  activeTab,
  setActiveTab,
  onExportExcel,
  onUploadClick,
  onResetData,
  isModified,
  totalRevenue
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0c10]/90 backdrop-blur-md border-b border-white/10 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Row: Brand, File Status & Global Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4 border-b border-white/5">
          {/* Brand & File Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-400/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  لوحة التحليلات التفاعلية
                </h1>
                <span className="mono-label text-[10px] bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded">
                  business-data.xlsx
                </span>
              </div>
              <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5 font-mono-tech">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>إجمالي الأداء: {totalRevenue.toLocaleString('ar-SA')} ر.س</span>
                {isModified && (
                  <span className="text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded text-[10px]">
                    (بيانات مُعدّلة)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Actions: Export / Upload / Reset */}
          <div className="flex items-center gap-2 font-mono-tech text-xs">
            <button
              onClick={onExportExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f1115] hover:bg-emerald-400 hover:text-black border border-white/10 text-slate-200 transition-all cursor-pointer font-bold"
              title="تصدير البيانات إلى ملف Excel"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black" />
              <span>تصدير XLSX</span>
            </button>

            <button
              onClick={onUploadClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400 text-black hover:bg-emerald-300 font-extrabold transition-all cursor-pointer shadow-sm shadow-emerald-400/20"
              title="رفع ملف Excel جديد"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>رفع ملف جديد</span>
            </button>

            {isModified && (
              <button
                onClick={onResetData}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 transition-all cursor-pointer"
                title="استعادة البيانات الأصلية"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>
            )}
          </div>
        </div>

        {/* Lower Row: Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 font-mono-tech scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>// 01 النظرة العامة (KPIs)</span>
          </button>

          <button
            onClick={() => setActiveTab('charts')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'charts'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>// 02 الرسوم البيانية</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>// 03 المشاريع والإنجازات</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'testimonials'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>// 04 آراء العملاء</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'editor'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>// 05 محرر البيانات الجدولية</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
