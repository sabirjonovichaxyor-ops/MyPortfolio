import { useTranslation } from 'react-i18next';
import { ContactContent } from './contactContent.types';

export const useContactContent = (): ContactContent => {
  const { t } = useTranslation('contact');

  return t('content', { returnObjects: true }) as ContactContent;
};
