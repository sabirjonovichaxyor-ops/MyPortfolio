import React from 'react';
import {
  Briefcase,
  Calendar,
  Award,
  TrendingUp,
} from 'lucide-react';
import { trackPageView } from '@/shared/api/analyticsApi';
import { useExperienceContent } from '../model/useExperienceContent';
import { EXPERIENCE_COLORS } from '../config/experience.config';

const Experience: React.FC = () => {
  const content = useExperienceContent();

  React.useEffect(() => {
    trackPageView('experience');
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {content.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />

          <div className="space-y-12">
            {content.experiences.map((exp, index) => {
              const color = EXPERIENCE_COLORS[exp.color];

              return (
                <div key={index} className="relative flex items-start space-x-8">
                  <div
                    className={`w-16 h-16 ${color.icon} rounded-full flex items-center justify-center shadow-lg z-10`}
                  >
                    <Briefcase className="w-8 h-8" />
                  </div>

                  <div
                    className={`flex-1 bg-gradient-to-br ${color.bg} rounded-2xl p-8 shadow-lg border ${color.border}`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                          {exp.title}
                        </h3>
                        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2 bg-white/100 dark:bg-gray-600/50 px-3 py-1 rounded-full">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/100 dark:bg-gray-600/50 px-3 py-1 rounded-full">
                          <TrendingUp className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-200 mb-6">
                      {exp.description}
                    </p>

                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                          {content.achievementsTitle}
                        </h4>
                      </div>

                      <ul className="space-y-2">
                        {exp.achievements.map((item, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
                            <span className="text-gray-700 dark:text-gray-400">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {content.summary.map((stat, i) => (
            <div
              key={i}
              className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
            >
              <div className="text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
