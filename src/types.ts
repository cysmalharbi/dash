export type ProjectCategory = 'all' | 'web' | 'mobile' | 'uiux' | 'ai';

export type SkillCategory = 'all' | 'frontend' | 'backend' | 'tools';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  highlights: string[];
  metrics?: string;
  year: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  iconName: string;
  proficiencyLabel: 'خبير' | 'متقدم' | 'متقن';
  highlights?: string[];
}

export interface ExperienceItem {
  id: string;
  type: 'work' | 'education';
  yearRange: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  keyAchievements: string[];
  iconName?: string;
}

export interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
}

export interface StatBadge {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}
