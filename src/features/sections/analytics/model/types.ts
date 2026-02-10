export interface PopularPage {
  page: string;
  count: number;
}

export interface RecentView {
  page: string;
  created_at: string;
}

export interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  popularPages: PopularPage[];
  recentViews: RecentView[];
}
