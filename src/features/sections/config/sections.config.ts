import type { FC } from 'react';
import type { SectionConfig, SectionKey } from '../model/types';

import Home from '../home/ui/Home';
import About from '../about/ui/About';
import Skills from '../skills/ui/Skills';
import Experience from '../experience/ui/Experience';
import Projects from '../../projects/ui/Projects'; 
import Blog from '../blog/ui/Blog';
import { Analytics } from '../analytics/ui/Analytics';
import Contact from '../contact/ui/Contact';

export const sectionsConfig = [
  { id: 'home', component: Home, showInNav: true },
  { id: 'about', component: About, showInNav: true },
  { id: 'skills', component: Skills, showInNav: true },      
  { id: 'experience', component: Experience, showInNav: true },
  { id: 'projects', component: Projects, showInNav: false }, 
  { id: 'blog', component: Blog, showInNav: true },
  { id: 'analytics', component: Analytics, showInNav: true },
  { id: 'contact', component: Contact, showInNav: true },
] as const satisfies readonly SectionConfig[];

export const sectionIds = sectionsConfig.map(section => section.id) as readonly SectionKey[];

export const navSections = sectionsConfig.filter(section => section.showInNav);
