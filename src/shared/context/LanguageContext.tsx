import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import i18n from '../../lib/i18n';
import type { AppLanguage } from '../../features/language/config/languages.config';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useLocalStorage<AppLanguage>('language', 'uz');

  const setLanguage = (lang: AppLanguage) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage } },
    children
  );
};

export const useLanguageContext = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguageContext must be used within LanguageProvider');
  return ctx;
};
