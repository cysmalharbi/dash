export interface MonthlyMetric {
  id: string;
  month: string;       // الشهر (e.g., يناير)
  clients: number;     // العملاء
  revenue: number;     // الإيرادات (ريال)
  projects: number;    // المشاريع
  satisfaction: number; // الرضا (%)
}

export interface ProjectRecord {
  id: string;
  name: string;        // اسم المشروع
  client: string;      // العميل
  sector: string;      // القطاع (تجزئة, أغذية, مصرفي, صحي, تقنية)
  description: string; // الوصف
  result: string;      // النتيجة
  year: number;        // سنة التنفيذ
}

export interface TestimonialRecord {
  id: string;
  name: string;        // الاسم
  role: string;        // المنصب
  company: string;     // الشركة
  text: string;        // الشهادة
}

export type QuarterFilter = 'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface DashboardFilter {
  quarter: QuarterFilter;
  sector: string;
  year: string;
  searchTerm: string;
  activeMetric: 'revenue' | 'clients' | 'projects' | 'satisfaction';
}
