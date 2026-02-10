import { useEffect, useState } from 'react'
import type { SectionKey } from './types'

export const useActiveSection = (
  sectionIds: readonly SectionKey[],
  defaultSection: SectionKey = 'home'
) => {
  const getFromHash = (): SectionKey => {
    const hash = window.location.hash.replace('#', '') as SectionKey
    return sectionIds.includes(hash) ? hash : defaultSection
  }

  const [active, setActive] = useState<SectionKey>(getFromHash)

  useEffect(() => {
    const onHashChange = () => {
      const section = getFromHash()
      setActive(section)

      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    }

    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const setSection = (section: SectionKey) => {
    window.location.hash = section
  }

  return { activeSection: active, setSection }
}
