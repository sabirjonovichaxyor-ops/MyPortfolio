export type ExperienceColor = 'blue' | 'purple' | 'green';

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  duration: string;
  description: string;
  achievements: string[];
  color: ExperienceColor;
}

export interface ExperienceSummaryStat {
  value: string;
  label: string;
}

export interface ExperienceContent {
  title: string;
  subtitle: string;
  achievementsTitle: string;
  experiences: ExperienceItem[];
  summary: ExperienceSummaryStat[];
}
