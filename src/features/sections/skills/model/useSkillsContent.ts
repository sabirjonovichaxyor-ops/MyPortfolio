import { useTranslation } from 'react-i18next'
import { Code, Wrench, Palette, Database } from 'lucide-react'
import { SkillsContent } from './skills.types'

const ICON_MAP = {
  frontend: Code,
  electro: Wrench,
  design: Palette,
  backend: Database,
}

const COLOR_MAP = {
  frontend: 'blue',
  electro: 'orange',
  design: 'purple',
  backend: 'green',
}

export const useSkillsContent = () => {
  const { t } = useTranslation('skills')
  const content = t('content', { returnObjects: true }) as SkillsContent;

  const skillCategories = Object.entries(content.categories).map(
    ([key, value]) => ({
      id: key,
      title: value.title,
      skills: value.skills,
      icon: ICON_MAP[key as keyof typeof ICON_MAP],
      color: COLOR_MAP[key as keyof typeof COLOR_MAP],
    })
  )

  return {
    title: content.title,
    subtitle: content.subtitle,
    toolsTitle: content.toolsTitle,
    certsTitle: content.certsTitle,
    skillCategories,
    tools: content.tools,
    certifications: content.certifications,
  }
}
