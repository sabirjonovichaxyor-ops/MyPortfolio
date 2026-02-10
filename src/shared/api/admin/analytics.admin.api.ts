import { supabase } from "@/lib/supabase";
import { PortfolioView } from "@/entities/analytics";

export const AnalyticsAdminApi = {
  getAnalytics: async (period: "day" | "week" | "month" | "year") => {
    const { data, error } = await supabase.rpc("get_portfolio_analytics", {
      period: period
    });
    
    if (error) throw error;
    return data;
  }
};
