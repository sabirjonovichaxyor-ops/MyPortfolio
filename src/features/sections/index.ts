export type { 
  SectionKey, 
  SectionConfig, 
  SectionComponent, 
  SectionsList 
} from './model/types';

// Hooks
export { useActiveSection } from './model/useActiveSection';

// Components
export { Sections } from './ui/Section';

// Config
export { 
  sectionsConfig, 
  sectionIds, 
  navSections 
} from './config/sections.config';

// Individual Sections
export { default as Home } from './home/ui/Home';
export { default as About } from './about/ui/About';
export { default as Skills } from './skills/ui/Skills';
export { default as Experience } from './experience/ui/Experience';
export { Analytics } from './analytics/ui/Analytics';
export { default as Blog } from './blog/ui/Blog';
export { default as Contact } from './contact/ui/Contact';
