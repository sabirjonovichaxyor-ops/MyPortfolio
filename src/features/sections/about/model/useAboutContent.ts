import { useTranslation } from 'react-i18next';
import { About } from './about.types';

export const useAboutContent = () => {
  const { t } = useTranslation('about');

  return t('content', { returnObjects: true }) as About;
};
