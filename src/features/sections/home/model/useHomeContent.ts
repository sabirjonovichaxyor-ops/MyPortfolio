import { useTranslation } from 'react-i18next';
import { HomeContent } from './homeContent.types';

export const useHomeContent = (): HomeContent => {
  const { t } = useTranslation('home');

  return t('content', { returnObjects: true }) as HomeContent;
};
