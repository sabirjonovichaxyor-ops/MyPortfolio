import { useTranslation } from 'react-i18next'
import i18n from '../../../lib/i18n'
import { LANGUAGES } from '../config/languages.config'

export function useLanguage() {
  const { t, i18n: i18nInstance } = useTranslation('common')

  const currentLanguage =
    LANGUAGES.find(l => l.code === i18nInstance.language) ??
    LANGUAGES[0]

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
  }

  return {
    t,
    languages: LANGUAGES,
    currentLanguage,
    changeLanguage,
  }
}
