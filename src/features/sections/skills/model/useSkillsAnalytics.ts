import { useEffect } from 'react'
import { trackPageView } from '@/shared/api/analyticsApi'

export const useSkillsAnalytics = () => {
  useEffect(() => {
    trackPageView('skills')
  }, [])
}
