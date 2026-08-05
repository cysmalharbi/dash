import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { MonthlyMetric, ProjectRecord, TestimonialRecord } from '../types/dashboard';

interface DataEditorTabProps {
  monthlyMetrics: MonthlyMetric[];
  setMonthlyMetrics: React.Dispatch<React.SetStateAction<MonthlyMetric[]>>;
  projects: ProjectRecord[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectRecord[]>>;
  testimonials: TestimonialRecord[];
  setTestimonials: React.Dispatch<React.SetStateAction<TestimonialRecord[]>>;
  onExportExcel: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  isModified: boolean;
}

export const DataEditorTab: React.FC<DataEditorTabProps> = ({
  monthlyMetrics,
  setMonthlyMetrics,
  projects,
  setProjects,
  testimonials,
  setTestimonials,
  onExportExcel,
  onFileUpload,
  onResetData,
  isModified
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'monthly' | 'projects' | 'testimonials'>('monthly');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Helper for status feedback
  const showFeedback = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Inline Monthly Metric Handlers
  const handleMonthlyChange = (id: string, field: keyof MonthlyMetric, value: any) => {
    setMonthlyMetrics(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleAddMonthlyRow = () => {
    const newRow: MonthlyMetric = {
      id: `m-custom-${Date.now()}`,
      month: `شهر جديد ${monthlyMetrics.length + 1}`,
      clients: 10,
      revenue: 50000,
      projects: 3,
      satisfaction: 95
    };
    setMonthlyMetrics(prev => [...prev, newRow]);
    showFeedback('تمت إضافة صف جديد في البيانات الشهرية');
  };

  const handleDeleteMonthlyRow = (id: string) => {
    setMonthlyMetrics(prev => prev.filter(m => m.id !== id));
    showFeedback('تم حذف الصف المحدد');
  };

  // Inline Project Handlers
  const handleProjectChange = (id: string, field: keyof ProjectRecord, value: any) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddProjectRow = () => {
    const newProject: ProjectRecord = {
      id: `p-custom-${Date.now()}`,
      name: 'مشروع جديد',
      client: 'جهة جديدة',
      sector: 'تقنية',
      description: 'وصف تفصيلي للمشروع',
      result: 'تحقيق أثر ملموس',
      year: 2024
    };
    setProjects(prev => [...prev, newProject]);
    showFeedback('تمت إضافة مشروع جديد');
  };

  const handleDeleteProjectRow = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showFeedback('تم حذف المشروع المحدد');
  };

  // Inline Testimonial Handlers
  const handleTestimonialChange = (id: string, field: keyof TestimonialRecord, value: any) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleAddTestimonialRow = () => {
    const newTestimonial: TestimonialRecord = {
      id: `t-custom-${Date.now()}`,
      name: 'اسم العميل',
      role: 'المنصب الإداري',
      company: 'اسم الشركة',
      text: 'انطباع وشهادة العميل عن الخدمة'
    };
    setTestimonials(prev => [...prev, newTestimonial]);
    showFeedback('تمت إضافة شهادة جديدة');
  };

  const handleDeleteTestimonialRow = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    showFeedback('تم حذف الشهادة المحددة');
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Top Controls & Upload Area */}
      <div className="bg-[#0f1115] border border-white/10 rounded-xl p-6 shadow-xl space-y-4">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <span className="mono-label mb-1">// DATA MANAGEMENT ENGINE</span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <span>محرر وقاعدة بيانات business-data.xlsx</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs">
            {/* File Upload Input */}
            <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400 text-black font-extrabold cursor-pointer hover:bg-emerald-300 transition-all shadow-sm">
              <Upload className="w-4 h-4" />
              <span>رفع ملف Excel (.xlsx)</span>
              <input type="file" accept=".xlsx, .xls" onChange={onFileUpload} className="hidden" />
            </label>

            <button
              onClick={onExportExcel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 hover:bg-emerald-400 hover:text-black border border-white/10 text-slate-200 font-bold transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>تصدير البيانات الحاليّة</span>
            </button>

            {isModified && (
              <button
                onClick={onResetData}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/60 border border-red-500/30 font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط للأصل</span>
              </button>
            )}
          </div>
        </div>

        {/* Status Toast Notice */}
        {statusMsg && (
          <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono-tech flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Sub-tabs Selector */}
        <div className="flex items-center gap-2 font-mono-tech text-xs pt-1">
          <button
            onClick={() => setActiveSubTab('monthly')}
            className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'monthly'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'bg-black/40 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            جدول 1: البيانات الشهرية ({monthlyMetrics.length})
          </button>

          <button
            onClick={() => setActiveSubTab('projects')}
            className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'projects'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'bg-black/40 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            جدول 2: المشاريع ({projects.length})
          </button>

          <button
            onClick={() => setActiveSubTab('testimonials')}
            className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'testimonials'
                ? 'bg-emerald-400 text-black font-extrabold'
                : 'bg-black/40 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            جدول 3: الشهادات ({testimonials.length})
          </button>
        </div>

      </div>

      {/* Table 1: Monthly Metrics Editor */}
      {activeSubTab === 'monthly' && (
        <div className="bg-[#0f1115] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-300 font-bold">
              // تعديل القيم الشهرية (الإيرادات، العملاء، المشاريع، الرضا)
            </span>
            <button
              onClick={handleAddMonthlyRow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400 hover:text-black border border-emerald-400/30 text-xs font-mono-tech font-bold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة شهر جديد</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs font-mono-tech">
              <thead className="bg-black/60 text-emerald-400 border-b border-white/10 uppercase">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">الشهر</th>
                  <th className="p-3">العملاء</th>
                  <th className="p-3">الإيرادات (SAR)</th>
                  <th className="p-3">المشاريع</th>
                  <th className="p-3">الرضا (%)</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {monthlyMetrics.map((m, idx) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 text-slate-500 font-bold">{idx + 1}</td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={m.month}
                        onChange={(e) => handleMonthlyChange(m.id, 'month', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-white outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={m.clients}
                        onChange={(e) => handleMonthlyChange(m.id, 'clients', Number(e.target.value))}
                        className="w-24 px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-white outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={m.revenue}
                        onChange={(e) => handleMonthlyChange(m.id, 'revenue', Number(e.target.value))}
                        className="w-32 px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-emerald-400 font-bold outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={m.projects}
                        onChange={(e) => handleMonthlyChange(m.id, 'projects', Number(e.target.value))}
                        className="w-20 px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-white outline-none"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={m.satisfaction}
                        onChange={(e) => handleMonthlyChange(m.id, 'satisfaction', Number(e.target.value))}
                        className="w-20 px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-white outline-none"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDeleteMonthlyRow(m.id)}
                        className="p-1.5 rounded bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        title="حذف الصف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Table 2: Projects Editor */}
      {activeSubTab === 'projects' && (
        <div className="bg-[#0f1115] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-300 font-bold">
              // تعديل سجل المشاريع ودراسات الحالة
            </span>
            <button
              onClick={handleAddProjectRow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400 hover:text-black border border-emerald-400/30 text-xs font-mono-tech font-bold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة مشروع جديد</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs font-mono-tech">
              <thead className="bg-black/60 text-emerald-400 border-b border-white/10 uppercase">
                <tr>
                  <th className="p-3">اسم المشروع</th>
                  <th className="p-3">العميل</th>
                  <th className="p-3">القطاع</th>
                  <th className="p-3">النتيجة والأثر</th>
                  <th className="p-3">السنة</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-2">
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => handleProjectChange(p.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-white font-bold outline-none font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={p.client}
                        onChange={(e) => handleProjectChange(p.id, 'client', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-slate-300 outline-none font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={p.sector}
                        onChange={(e) => handleProjectChange(p.id, 'sector', e.target.value)}
                        className="w-24 px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-emerald-400 font-bold outline-none font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={p.result}
                        onChange={(e) => handleProjectChange(p.id, 'result', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-emerald-300 outline-none font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={p.year}
                        onChange={(e) => handleProjectChange(p.id, 'year', Number(e.target.value))}
                        className="w-20 px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-slate-300 outline-none"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDeleteProjectRow(p.id)}
                        className="p-1.5 rounded bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        title="حذف المشروع"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Table 3: Testimonials Editor */}
      {activeSubTab === 'testimonials' && (
        <div className="bg-[#0f1115] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono-tech text-slate-300 font-bold">
              // تعديل شهادات وآراء العملاء
            </span>
            <button
              onClick={handleAddTestimonialRow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400 hover:text-black border border-emerald-400/30 text-xs font-mono-tech font-bold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة شهادة جديدة</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs font-mono-tech">
              <thead className="bg-black/60 text-emerald-400 border-b border-white/10 uppercase">
                <tr>
                  <th className="p-3">الاسم</th>
                  <th className="p-3">المنصب</th>
                  <th className="p-3">الشركة</th>
                  <th className="p-3">نص الشهادة</th>
                  <th className="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-2">
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => handleTestimonialChange(t.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-white font-bold outline-none font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={t.role}
                        onChange={(e) => handleTestimonialChange(t.id, 'role', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-slate-300 outline-none font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={t.company}
                        onChange={(e) => handleTestimonialChange(t.id, 'company', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-emerald-400 font-bold outline-none font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={t.text}
                        onChange={(e) => handleTestimonialChange(t.id, 'text', e.target.value)}
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 focus:border-emerald-400 text-slate-200 outline-none font-sans"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDeleteTestimonialRow(t.id)}
                        className="p-1.5 rounded bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        title="حذف الشهادة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
