import React from 'react';
import { BarChart3, Calendar, Eye, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAnalyticsContent } from '../model/useAnalyticsContent';
import { useAnalyticsData } from '../model/useAnalyticsData';
import { pageNames } from '../config/pageNames';
import StatCard from '@/shared/ui/ui-decorative/StatCard';

export const Analytics: React.FC = () => {
  const { t } = useTranslation('analytics');
  const { data, loading } = useAnalyticsData()
  const content = useAnalyticsContent()


  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  const maxCount = Math.max(
    ...data.popularPages.map((p) => p.count),
    1
  );

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t('analytics.title')}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
            title={t("analytics.stats.total")}
            value={data.totalViews}
            label={t("analytics.labels.views")}
            icon={Eye}
            color="blue"
        />
          <StatCard
            title={t("analytics.stats.today")}
            value={data.todayViews}
            label={t("analytics.labels.views")}
            icon={Calendar}
            color="green"
          />
          <StatCard
            title={t("analytics.stats.pages")}
            value={data.popularPages.length}
            label={t("analytics.labels.pages")}
            icon={Users}
            color="purple"
          />
          <StatCard
            title={t("analytics.stats.average")}
            value={Math.round(
              data.totalViews / Math.max(data.popularPages.length, 1)
            )}
            label={t('analytics.labels.views')}
            icon={BarChart3}
            color="orange"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">
              {t('analytics.popular')}
            </h3>

            {data.popularPages.map((item, i) => (
              <div key={item.page} className="flex justify-between mb-3">
                <span>
                  {i + 1}. {t(`analytics.pages.${pageNames[item.page]}`)}
                </span>
                <span>{item.count}</span>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">
              {t('analytics.recent')}
            </h3>

            {data.recentViews.map((v, i) => (
              <div key={i} className="flex justify-between text-sm mb-2">
                <span>
                  {t(`analytics.pages.${pageNames[v.page]}`)}
                </span>
                <span>{new Date(v.created_at).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
 export default Analytics;