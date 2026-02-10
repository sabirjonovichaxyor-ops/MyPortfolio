import { ExperienceColor } from '../model/types';

export const EXPERIENCE_COLORS: Record<
  ExperienceColor,
  {
    bg: string;
    icon: string;
    border: string;
  }
> = {
  blue: {
    bg: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-700/30',
  },
  purple: {
    bg: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    icon:
      'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-700/30',
  },
  green: {
    bg: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    icon:
      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-700/30',
  },
};
