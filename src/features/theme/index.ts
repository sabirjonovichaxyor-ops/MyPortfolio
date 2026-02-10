export { ThemeProvider } from './ui/ThemeProvider';

export { useThemeContext as useTheme } from './model/theme-context';

export type { Theme, ThemeContextType } from './model/theme-context';

export { 
  getInitialTheme, 
  isValidTheme, 
  saveTheme, 
  applyTheme 
} from './lib/theme-utils';
