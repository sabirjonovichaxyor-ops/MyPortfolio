import { useTranslation } from 'react-i18next'
import { ExperienceContent } from './types';

export function useExperienceContent(): ExperienceContent {
  const { t } = useTranslation('experience');

  return {
    title: t('title'),
    subtitle: t('subtitle'),
    achievementsTitle: t('achievements'),

    experiences: [
      {
        title: t('items.senior.title'),
        company: t('items.senior.company'),
        period: t('items.senior.period'),
        duration: t('items.senior.duration'),
        description: t('items.senior.description'),
        achievements: [
          t('items.senior.achievements.0'),
          t('items.senior.achievements.1'),
          t('items.senior.achievements.2'),
        ],
        color: 'blue',
      },
      {
        title: t('items.frontend.title'),
        company: t('items.frontend.company'),
        period: t('items.frontend.period'),
        duration: t('items.frontend.duration'),
        description: t('items.frontend.description'),
        achievements: [
          t('items.frontend.achievements.0'),
          t('items.frontend.achievements.1'),
          t('items.frontend.achievements.2'),
        ],
        color: 'purple',
      },
      {
        title: t('items.designer.title'),
        company: t('items.designer.company'),
        period: t('items.designer.period'),
        duration: t('items.designer.duration'),
        description: t('items.designer.description'),
        achievements: [
          t('items.designer.achievements.0'),
          t('items.designer.achievements.1'),
          t('items.designer.achievements.2'),
        ],
        color: 'green',
      },
    ],

    summary: [
      { value: '12+', label: t('summary.years') },
      { value: '100+', label: t('summary.projects') },
      { value: '50+', label: t('summary.clients') },
    ],
  };
}
