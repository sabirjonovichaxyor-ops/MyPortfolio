import { useEffect } from 'react'
import { trackPageView } from '@/shared/api/analyticsApi'

export const useAboutAnalytics = () => {
  useEffect(() => {
    trackPageView('about')
  }, [])
}
