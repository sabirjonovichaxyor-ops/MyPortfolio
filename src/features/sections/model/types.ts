import type { FC } from 'react';

// Section ID lar - birlashtirilgan type
export type SectionKey = 
  | 'home'
  | 'about' 
  | 'skills'
  | 'experience'
  | 'projects'
  | 'analytics'
  | 'blog'
  | 'contact';

// Section konfiguratsiyasi interface
export interface SectionConfig {
  id: SectionKey;
  component: FC;
  showInNav: boolean;
}

// Section komponentlari uchun type
export type SectionComponent = FC;

// Sections ro'yxati uchun type
export type SectionsList = readonly SectionConfig[];
