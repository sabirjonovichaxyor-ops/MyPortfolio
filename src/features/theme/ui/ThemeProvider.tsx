import { useEffect, useState, useCallback, useMemo } from 'react';
import { ThemeContext, Theme } from '../model/theme-context';
import { getInitialTheme, saveTheme, applyTheme } from '../lib/theme-utils';


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setThemeCallback = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    setTheme: setThemeCallback,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }), [theme, toggleTheme, setThemeCallback]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
