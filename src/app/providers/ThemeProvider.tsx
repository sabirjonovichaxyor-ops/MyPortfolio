import { useState, useEffect } from 'react';
import { ThemeContext, Theme } from '@/features/theme/model/theme-context';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'portfolio-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    
    try {
      // localStorage dan o'qish
      const stored = localStorage.getItem(storageKey) as Theme | null;
      
      // Agar saqlangan theme bo'lsa
      if (stored) {
        return stored;
      }
      
      // System preference ni tekshirish
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    } catch (error) {
      console.error('Error reading theme from storage:', error);
      return defaultTheme;
    }
  });

  // DOM ga theme class'larini qo'llash
  useEffect(() => {
    const root = document.documentElement;
    
    // Eski classlarni tozalash
    root.classList.remove('light', 'dark');
    
    // Yangi classni qo'shish
    root.classList.add(theme);
    
    // Data attribute qo'shish (agar kerak bo'lsa)
    root.setAttribute('data-theme', theme);
    
    // localStorage ga saqlash
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.error('Error saving theme to storage:', error);
    }
    
    console.log('Theme updated to:', theme); // Debug
  }, [theme, storageKey]);

  // System theme o'zgarishini kuzatish
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Faqat agar user theme tanlamagan bo'lsa
      if (!localStorage.getItem(storageKey)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Modern event listener
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [storageKey]);

  // Toggle funksiyasi
  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      console.log('Toggling theme:', prev, '→', newTheme);
      return newTheme;
    });
  };

  // Context value
  const value = {
    theme,
    toggleTheme,
    setTheme: (newTheme: Theme) => {
      console.log('Setting theme to:', newTheme);
      setTheme(newTheme);
    },
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}