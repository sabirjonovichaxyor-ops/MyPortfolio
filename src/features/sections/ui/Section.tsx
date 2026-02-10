import { sectionsConfig, sectionIds } from '../config/sections.config'
import { useActiveSection } from '../model/useActiveSection'
import type { SectionKey } from '../model/types'


export const Sections = () => {
  const { activeSection } = useActiveSection(sectionIds)

  const ActiveSection = sectionsConfig.find(
    section => section.id === activeSection
  )?.component

  if (!ActiveSection) {
    console.warn(`Section "${activeSection}" not found, falling back to home`)
    const HomeSection = sectionsConfig.find(s => s.id === 'home')?.component
    return HomeSection ? <HomeSection /> : null
  }

  return <ActiveSection />
}
