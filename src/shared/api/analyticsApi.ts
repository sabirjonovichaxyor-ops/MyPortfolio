import { supabase } from '@/lib/supabase'
import { PortfolioView } from '@/entities/analytics/PortfolioView'

export const trackPageView = async (page: string) => {
  try {
    const { error } = await supabase
      .from('portfolio_views')
      .insert([{
        page,
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.warn('Analytics tracking failed:', error.message);
    }
  } catch (error) {
    console.warn('Analytics service unavailable:', error);
  }
};