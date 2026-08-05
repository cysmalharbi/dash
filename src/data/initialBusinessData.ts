import * as XLSX from 'xlsx';
import { MonthlyMetric, ProjectRecord, TestimonialRecord } from '../types/dashboard';

export const INITIAL_MONTHLY_METRICS: MonthlyMetric[] = [
  { id: 'm-1', month: 'يناير', clients: 12, revenue: 45000, projects: 4, satisfaction: 94 },
  { id: 'm-2', month: 'فبراير', clients: 15, revenue: 52000, projects: 5, satisfaction: 96 },
  { id: 'm-3', month: 'مارس', clients: 18, revenue: 61000, projects: 6, satisfaction: 95 },
  { id: 'm-4', month: 'أبريل', clients: 14, revenue: 48000, projects: 5, satisfaction: 97 },
  { id: 'm-5', month: 'مايو', clients: 20, revenue: 72000, projects: 7, satisfaction: 96 },
  { id: 'm-6', month: 'يونيو', clients: 22, revenue: 81000, projects: 8, satisfaction: 98 },
  { id: 'm-7', month: 'يوليو', clients: 19, revenue: 68000, projects: 6, satisfaction: 95 },
  { id: 'm-8', month: 'أغسطس', clients: 24, revenue: 89000, projects: 9, satisfaction: 97 },
  { id: 'm-9', month: 'سبتمبر', clients: 26, revenue: 95000, projects: 10, satisfaction: 98 },
  { id: 'm-10', month: 'أكتوبر', clients: 23, revenue: 84000, projects: 8, satisfaction: 96 },
  { id: 'm-11', month: 'نوفمبر', clients: 28, revenue: 102000, projects: 11, satisfaction: 99 },
  { id: 'm-12', month: 'ديسمبر', clients: 31, revenue: 118000, projects: 12, satisfaction: 98 }
];

export const INITIAL_PROJECTS: ProjectRecord[] = [
  {
    id: 'p-1',
    name: 'إعادة هيكلة العمليات',
    client: 'مجموعة الفهد التجارية',
    sector: 'تجزئة',
    description: 'تحليل وإعادة تصميم سلسلة التوريد وعمليات المخزون',
    result: 'خفض التكاليف 32%',
    year: 2024
  },
  {
    id: 'p-2',
    name: 'استراتيجية التوسع الإقليمي',
    client: 'شركة نماء للأغذية',
    sector: 'أغذية',
    description: 'بناء خطة دخول ثلاث أسواق خليجية جديدة',
    result: 'افتتاح 8 فروع',
    year: 2024
  },
  {
    id: 'p-3',
    name: 'برنامج تطوير القيادات',
    client: 'بنك الخليج الأول',
    sector: 'مصرفي',
    description: 'تصميم وتنفيذ برنامج تدريبي لـ 45 مدير',
    result: 'رفع الأداء 28%',
    year: 2023
  },
  {
    id: 'p-4',
    name: 'تحول رقمي شامل',
    client: 'مستشفى الرعاية المتقدمة',
    sector: 'صحي',
    description: 'رقمنة العمليات الإدارية وملفات المرضى',
    result: 'توفير 1200 ساعة شهرياً',
    year: 2023
  },
  {
    id: 'p-5',
    name: 'إعادة بناء ثقافة المؤسسة',
    client: 'شركة إبداع للتقنية',
    sector: 'تقنية',
    description: 'برنامج متكامل لتحسين بيئة العمل والاحتفاظ بالمواهب',
    result: 'خفض الاستقالات 45%',
    year: 2023
  },
  {
    id: 'p-6',
    name: 'تحسين تجربة العملاء',
    client: 'متاجر الوفاء',
    sector: 'تجزئة',
    description: 'إعادة تصميم رحلة العميل من الاكتشاف حتى ما بعد البيع',
    result: 'رفع الرضا إلى 94%',
    year: 2022
  }
];

export const INITIAL_TESTIMONIALS: TestimonialRecord[] = [
  {
    id: 't-1',
    name: 'خالد العتيبي',
    role: 'الرئيس التنفيذي',
    company: 'مجموعة الفهد التجارية',
    text: 'عملنا مع أحمد على إعادة هيكلة عملياتنا. النتائج فاقت توقعاتنا بمراحل، والفريق صار يشتغل بكفاءة ما شفناها قبل.'
  },
  {
    id: 't-2',
    name: 'نورة الشمري',
    role: 'مديرة التطوير',
    company: 'شركة نماء للأغذية',
    text: 'أكثر شي أعجبني إنه ما يعطيك حلول جاهزة — يفهم وضعك أول، وبعدين يبني معك خطة تناسبك أنت بالذات.'
  },
  {
    id: 't-3',
    name: 'سعد القحطاني',
    role: 'مدير الموارد البشرية',
    company: 'بنك الخليج الأول',
    text: 'برنامج القيادة اللي صممه غيّر طريقة تفكير مدرائنا. لاحظنا الفرق في أول شهرين.'
  }
];

// Excel Export Helper
export function exportToExcel(
  monthlyData: MonthlyMetric[],
  projectsData: ProjectRecord[],
  testimonialsData: TestimonialRecord[]
) {
  const wb = XLSX.utils.book_new();

  // 1. Sheet: البيانات الشهرية
  const monthlyRows = monthlyData.map(m => ({
    'الشهر': m.month,
    'العملاء': m.clients,
    'الإيرادات': m.revenue,
    'المشاريع': m.projects,
    'الرضا': m.satisfaction
  }));
  
  // Calculate Totals row
  const totalClients = monthlyData.reduce((acc, m) => acc + m.clients, 0);
  const totalRevenue = monthlyData.reduce((acc, m) => acc + m.revenue, 0);
  const totalProjects = monthlyData.reduce((acc, m) => acc + m.projects, 0);
  const avgSatisfaction = Math.round(monthlyData.reduce((acc, m) => acc + m.satisfaction, 0) / (monthlyData.length || 1));

  monthlyRows.push({
    'الشهر': 'الإجمالي',
    'العملاء': totalClients,
    'الإيرادات': totalRevenue,
    'المشاريع': totalProjects,
    'الرضا': avgSatisfaction
  });

  const ws1 = XLSX.utils.json_to_sheet(monthlyRows);
  XLSX.utils.book_append_sheet(wb, ws1, 'البيانات الشهرية');

  // 2. Sheet: المشاريع
  const projectsRows = projectsData.map(p => ({
    'اسم المشروع': p.name,
    'العميل': p.client,
    'القطاع': p.sector,
    'الوصف': p.description,
    'النتيجة': p.result,
    'سنة التنفيذ': p.year
  }));
  const ws2 = XLSX.utils.json_to_sheet(projectsRows);
  XLSX.utils.book_append_sheet(wb, ws2, 'المشاريع');

  // 3. Sheet: الشهادات
  const testimonialsRows = testimonialsData.map(t => ({
    'الاسم': t.name,
    'المنصب': t.role,
    'الشركة': t.company,
    'الشهادة': t.text
  }));
  const ws3 = XLSX.utils.json_to_sheet(testimonialsRows);
  XLSX.utils.book_append_sheet(wb, ws3, 'الشهادات');

  // Download
  XLSX.writeFile(wb, 'business-data-updated.xlsx');
}

// Excel Upload Parser Helper
export async function parseExcelFile(file: File): Promise<{
  monthlyMetrics?: MonthlyMetric[];
  projects?: ProjectRecord[];
  testimonials?: TestimonialRecord[];
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        let monthlyMetrics: MonthlyMetric[] | undefined;
        let projects: ProjectRecord[] | undefined;
        let testimonials: TestimonialRecord[] | undefined;

        for (const sheetName of workbook.SheetNames) {
          const sheet = workbook.Sheets[sheetName];
          const rawJson: any[] = XLSX.utils.sheet_to_json(sheet);

          if (sheetName.includes('الشهرية') || sheetName.includes('Monthly')) {
            monthlyMetrics = rawJson
              .filter(r => r['الشهر'] && r['الشهر'] !== 'الإجمالي' && !r['الشهر'].startsWith('•') && !r['الشهر'].includes('ملاحظات'))
              .map((r, i) => ({
                id: `m-up-${i + 1}`,
                month: String(r['الشهر'] || `شهر ${i + 1}`),
                clients: Number(r['العملاء'] || 0),
                revenue: Number(r['الإيرادات'] || 0),
                projects: Number(r['المشاريع'] || 0),
                satisfaction: Number(r['الرضا'] || 0)
              }));
          } else if (sheetName.includes('المشاريع') || sheetName.includes('Projects')) {
            projects = rawJson.map((r, i) => ({
              id: `p-up-${i + 1}`,
              name: String(r['اسم المشروع'] || r['name'] || `مشروع ${i + 1}`),
              client: String(r['العميل'] || r['client'] || ''),
              sector: String(r['القطاع'] || r['sector'] || 'عام'),
              description: String(r['الوصف'] || r['description'] || ''),
              result: String(r['النتيجة'] || r['result'] || ''),
              year: Number(r['سنة التنفيذ'] || r['year'] || 2024)
            }));
          } else if (sheetName.includes('الشهادات') || sheetName.includes('Testimonials')) {
            testimonials = rawJson.map((r, i) => ({
              id: `t-up-${i + 1}`,
              name: String(r['الاسم'] || r['name'] || `عميل ${i + 1}`),
              role: String(r['المنصب'] || r['role'] || ''),
              company: String(r['الشركة'] || r['company'] || ''),
              text: String(r['الشهادة'] || r['text'] || '')
            }));
          }
        }

        resolve({ monthlyMetrics, projects, testimonials });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
