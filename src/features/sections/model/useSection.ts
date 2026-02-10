export type SectionKey =
  | 'home'
  | 'about'
  | 'skills'
  | 'experience'
  | 'analytics'
  | 'blog'
  | 'contact';

export interface SectionConfig {
  id: SectionKey;
  showInNav: boolean;
}
