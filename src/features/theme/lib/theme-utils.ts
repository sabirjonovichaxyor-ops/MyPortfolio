import type { Theme } from '../model/theme-context';

const THEME_STORAGE_KEY = 'app-theme';

export const getInitialTheme = (): Theme => {

  if (typeof window === 'undefined') {
    return 'light';
  }

  try {
  
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (saved && isValidTheme(saved)) {
      return saved;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch (error) {
    console.warn('Failed to detect system theme preference:', error);
    return 'light';
  }
};


export const isValidTheme = (value: unknown): value is Theme => {
  return value === 'light' || value === 'dark';
};


export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error);
  }
};


export const applyTheme = (theme: Theme): void => {
  try {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (error) {
    console.warn('Failed to apply theme to document:', error);
  }
};
