import React from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import { trackPageView } from '@/shared/api/analyticsApi';
import AnimatedSection from '@/shared/ui/ui-decorative/AnimatedSection';
import ProgressBar from '@/shared/ui/ui-decorative/ProgressBar';
import GlowCard from '@/shared/ui/ui-decorative/GlowCard';

import { useSkillsContent } from '../model/useSkillsContent';

const Skills: React.FC = () => {
  
  const {
    title,
    subtitle,
    toolsTitle,
    certsTitle,
    skillCategories,
    tools,
    certifications,
  } = useSkillsContent();

  const content = useSkillsContent();

  React.useEffect(() => {
    trackPageView('skills');
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {content.title}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </AnimatedSection>

        {/* Skills */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <AnimatedSection key={category.id} delay={index * 0.15}>
                <GlowCard className="p-8" glowColor={category.color}>
                  <motion.div
                    className="flex items-center space-x-4 mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <motion.div
                      className={`w-12 h-12 bg-${category.color}-500 text-white rounded-lg flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {category.title}
                    </h3>
                  </motion.div>

                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <ProgressBar
                        key={skill.name}
                        skill={skill.name}
                        level={skill.level}
                        color={category.color}
                        delay={index * 0.15 + skillIndex * 0.1}
                      />
                    ))}
                  </div>
                </GlowCard>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Tools */}
        <AnimatedSection delay={0.6}>
          <GlowCard className="p-8" glowColor="orange">
            <motion.div
              className="flex items-center justify-center space-x-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Zap className="w-8 h-8 text-yellow-500" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {toolsTitle}
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    {tool.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlowCard>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection className="mt-16 text-center" delay={0.8}>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
            {certsTitle}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className={`bg-gradient-to-br from-${cert.color}-50 to-${cert.color}-100
                  dark:from-${cert.color}-900/20 dark:to-${cert.color}-800/20
                  rounded-xl p-6 border border-${cert.color}-200
                  dark:border-${cert.color}-700/30`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                >
                  {cert.icon}
                </motion.div>

                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {cert.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default Skills;
