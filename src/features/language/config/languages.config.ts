export type AppLanguage = 'en' | 'ru' | 'uz' | 'kz' | 'ky';

export const LANGUAGES: {
  code: AppLanguage
  label: string
}[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: "O'zbekcha" },
  { code: 'kz', label: 'Қазақша' },
  { code: 'ky', label: 'Кыргызча' },
]

export const DEFAULT_LANGUAGE: AppLanguage = 'en'
