// model/useAnalyticsContent.ts
import { useTranslation } from 'react-i18next'
import { pageNames } from '../config/pageNames'

export const useAnalyticsContent = () => {
  const { t } = useTranslation('analytics')

  return {
    title: t('title'),

    stats: {
      total: t('stats.total'),
      today: t('stats.today'),
      pages: t('stats.pages'),
      average: t('stats.average'),
    },

    labels: {
      views: t('labels.views'),
      pages: t('labels.pages'),
    },

    popular: t('popular'),
    recent: t('recent'),

    pageName: (page: string) =>
      t(`pages.${pageNames[page] ?? page}`),
  }
}
