import { useState, useRef, useEffect, useCallback } from 'react';
import type { SectionKey } from '../../sections/model/types';
import { sectionsConfig } from '../../sections/config/sections.config';

export function useNavigation(activeSection: SectionKey) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const aboutItems = sectionsConfig.filter(
    (s) => s.id !== 'home' && s.showInNav
  );

  const isAboutActive = aboutItems.some(
    (item) => item.id === activeSection
  );

  const closeDropdown = useCallback(() => {
    setAboutOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDropdown();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeDropdown]);

  return {
    aboutOpen,
    setAboutOpen,
    mobileOpen,
    setMobileOpen,
    aboutItems,
    aboutRef,
    isAboutActive,
  };
}
