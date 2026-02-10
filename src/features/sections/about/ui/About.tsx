import React from 'react';
import { Calendar, GraduationCap, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackPageView } from '@/shared/api/analyticsApi';
import { useAboutContent } from '../model/useAboutContent';

const About: React.FC = () => {
  const content = useAboutContent();

  React.useEffect(() => {
    trackPageView('about');
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="space-y-8">
            {/* Image */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-purple-100 dark:from-blue-700/20 dark:to-purple-700/20 rounded-2xl flex items-center justify-center">
                <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl">
                  <motion.img
                    src="/public/images/Axyor.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  12+
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {content.stats.experience}
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  50+
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {content.stats.projects}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Personal info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                {content.personal.title}
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {content.personal.birthdate}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      13-yanvar, 1987
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {content.personal.location}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      O‘zbekiston
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                {content.education.title}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {content.education.higher}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {content.education.higher_desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {content.education.secondary}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {content.education.secondary_desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passion */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-2xl p-8 shadow-lg border border-pink-100 dark:border-pink-800/20">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {content.passion.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.passion.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
