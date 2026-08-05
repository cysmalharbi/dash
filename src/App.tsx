import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { 
  INITIAL_MONTHLY_METRICS, 
  INITIAL_PROJECTS, 
  INITIAL_TESTIMONIALS,
  exportToExcel,
  parseExcelFile
} from './data/initialBusinessData';
import { MonthlyMetric, ProjectRecord, TestimonialRecord, QuarterFilter } from './types/dashboard';
import { DashboardNavbar } from './components/DashboardNavbar';
import { KpiCards } from './components/KpiCards';
import { QuarterFilterBar } from './components/QuarterFilterBar';
import { ChartsSection } from './components/ChartsSection';
import { ProjectsAnalytics } from './components/ProjectsAnalytics';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InsightsPanel } from './components/InsightsPanel';
import { DataEditorTab } from './components/DataEditorTab';
import { FileCheck, RefreshCcw, Sparkles } from 'lucide-react';

export default function App() {
  const [monthlyMetrics, setMonthlyMetrics] = useState<MonthlyMetric[]>(INITIAL_MONTHLY_METRICS);
  const [projects, setProjects] = useState<ProjectRecord[]>(INITIAL_PROJECTS);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>(INITIAL_TESTIMONIALS);

  const [activeTab, setActiveTab] = useState<'overview' | 'charts' | 'projects' | 'testimonials' | 'editor'>('overview');
  const [quarter, setQuarter] = useState<QuarterFilter>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'clients' | 'projects' | 'satisfaction'>('revenue');
  const [isModified, setIsModified] = useState<boolean>(false);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load business-data.xlsx on startup if available in public
  useEffect(() => {
    async function loadExcelFromPublic() {
      try {
        const res = await fetch('/business-data.xlsx');
        if (res.ok) {
          const buffer = await res.arrayBuffer();
          const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
          
          let mData: MonthlyMetric[] = [];
          let pData: ProjectRecord[] = [];
          let tData: TestimonialRecord[] = [];

          for (const sName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sName];
            const rawJson: any[] = XLSX.utils.sheet_to_json(sheet);

            if (sName.includes('الشهرية') || sName.includes('Monthly')) {
              mData = rawJson
                .filter(r => r['الشهر'] && r['الشهر'] !== 'الإجمالي' && !String(r['الشهر']).startsWith('•') && !String(r['الشهر']).includes('ملاحظات'))
                .map((r, i) => ({
                  id: `m-init-${i + 1}`,
                  month: String(r['الشهر'] || `شهر ${i + 1}`),
                  clients: Number(r['العملاء'] || 0),
                  revenue: Number(r['الإيرادات'] || 0),
                  projects: Number(r['المشاريع'] || 0),
                  satisfaction: Number(r['الرضا'] || 0)
                }));
            } else if (sName.includes('المشاريع') || sName.includes('Projects')) {
              pData = rawJson.map((r, i) => ({
                id: `p-init-${i + 1}`,
                name: String(r['اسم المشروع'] || r['name'] || `مشروع ${i + 1}`),
                client: String(r['العميل'] || r['client'] || ''),
                sector: String(r['القطاع'] || r['sector'] || 'عام'),
                description: String(r['الوصف'] || r['description'] || ''),
                result: String(r['النتيجة'] || r['result'] || ''),
                year: Number(r['سنة التنفيذ'] || r['year'] || 2024)
              }));
            } else if (sName.includes('الشهادات') || sName.includes('Testimonials')) {
              tData = rawJson.map((r, i) => ({
                id: `t-init-${i + 1}`,
                name: String(r['الاسم'] || r['name'] || `عميل ${i + 1}`),
                role: String(r['المنصب'] || r['role'] || ''),
                company: String(r['الشركة'] || r['company'] || ''),
                text: String(r['الشهادة'] || r['text'] || '')
              }));
            }
          }

          if (mData.length > 0) setMonthlyMetrics(mData);
          if (pData.length > 0) setProjects(pData);
          if (tData.length > 0) setTestimonials(tData);
        }
      } catch (err) {
        console.log('Using default embedded dataset:', err);
      }
    }

    loadExcelFromPublic();
  }, []);

  // Filter metrics by quarter selection
  const filteredMetrics = monthlyMetrics.filter((_, idx) => {
    if (quarter === 'Q1') return idx >= 0 && idx < 3;
    if (quarter === 'Q2') return idx >= 3 && idx < 6;
    if (quarter === 'Q3') return idx >= 6 && idx < 9;
    if (quarter === 'Q4') return idx >= 9 && idx < 12;
    return true; // ALL
  });

  // Extract all unique sectors for filter dropdown
  const allSectors = Array.from(new Set(projects.map(p => p.sector)));

  // Global total revenue
  const totalRevenue = monthlyMetrics.reduce((acc, m) => acc + m.revenue, 0);

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadingFile(true);
    try {
      const parsed = await parseExcelFile(file);
      if (parsed.monthlyMetrics && parsed.monthlyMetrics.length > 0) {
        setMonthlyMetrics(parsed.monthlyMetrics);
      }
      if (parsed.projects && parsed.projects.length > 0) {
        setProjects(parsed.projects);
      }
      if (parsed.testimonials && parsed.testimonials.length > 0) {
        setTestimonials(parsed.testimonials);
      }
      setIsModified(true);
    } catch (err) {
      alert('حدث خطأ أثناء قراءة ملف Excel. يرجى التأكد من تنسيق الملف الصحيح.');
    } finally {
      setLoadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Export Excel Handler
  const handleExportExcel = () => {
    exportToExcel(monthlyMetrics, projects, testimonials);
  };

  // Reset Data Handler
  const handleResetData = () => {
    setMonthlyMetrics(INITIAL_MONTHLY_METRICS);
    setProjects(INITIAL_PROJECTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setIsModified(false);
    setQuarter('ALL');
    setSelectedSector('ALL');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-['Cairo',sans-serif] dir-rtl selection:bg-emerald-400 selection:text-black">
      
      {/* Hidden File Input for Header Trigger */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header & Global Navbar */}
      <DashboardNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportExcel={handleExportExcel}
        onUploadClick={() => fileInputRef.current?.click()}
        onResetData={handleResetData}
        isModified={isModified}
        totalRevenue={totalRevenue}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Loading Spinner overlay when parsing uploaded file */}
        {loadingFile && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono-tech text-xs flex items-center justify-center gap-2 animate-pulse">
            <RefreshCcw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>جاري معالجة وتحليل ملف Excel...</span>
          </div>
        )}

        {/* Global Quarter & Metric Filter Controls (shown on analytics tabs) */}
        {activeTab !== 'editor' && (
          <QuarterFilterBar
            quarter={quarter}
            setQuarter={setQuarter}
            activeMetric={activeMetric}
            setActiveMetric={setActiveMetric}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            allSectors={allSectors}
          />
        )}

        {/* Tab 1: Executive Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <KpiCards metrics={filteredMetrics} totalProjectsCount={projects.length} />
            <ChartsSection metrics={filteredMetrics} projects={projects} activeMetric={activeMetric} />
            <InsightsPanel metrics={filteredMetrics} projects={projects} />
          </div>
        )}

        {/* Tab 2: Deep Charts Analytics */}
        {activeTab === 'charts' && (
          <div className="space-y-6">
            <KpiCards metrics={filteredMetrics} totalProjectsCount={projects.length} />
            <ChartsSection metrics={filteredMetrics} projects={projects} activeMetric={activeMetric} />
          </div>
        )}

        {/* Tab 3: Projects Case Studies */}
        {activeTab === 'projects' && (
          <ProjectsAnalytics
            projects={projects}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {/* Tab 4: Client Testimonials */}
        {activeTab === 'testimonials' && (
          <TestimonialsSection testimonials={testimonials} />
        )}

        {/* Tab 5: Data Editor & Spreadsheet Table */}
        {activeTab === 'editor' && (
          <DataEditorTab
            monthlyMetrics={monthlyMetrics}
            setMonthlyMetrics={(updater) => {
              setMonthlyMetrics(updater);
              setIsModified(true);
            }}
            projects={projects}
            setProjects={(updater) => {
              setProjects(updater);
              setIsModified(true);
            }}
            testimonials={testimonials}
            setTestimonials={(updater) => {
              setTestimonials(updater);
              setIsModified(true);
            }}
            onExportExcel={handleExportExcel}
            onFileUpload={handleFileUpload}
            onResetData={handleResetData}
            isModified={isModified}
          />
        )}

      </main>

      {/* Global Footer */}
      <footer className="border-t border-white/10 bg-[#090a0d] py-6 text-center text-xs text-slate-400 font-mono-tech">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>// لوحة التحليلات التفاعلية لملف business-data.xlsx - 2026</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>12 شهر</span>
            <span>•</span>
            <span>{projects.length} مشاريع</span>
            <span>•</span>
            <span>{testimonials.length} شهادات</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
