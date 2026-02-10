import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProgressBarProps {
  skill: string;
  level: number;
  color?: string;
  delay?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  skill, 
  level, 
  color = 'blue',
  delay = 0 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {skill}
        </span>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          {level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div 
          className={`h-3 ${colorClasses[color as keyof typeof colorClasses]} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: delay,
            ease: [0.25, 0.25, 0.25, 0.75]
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: delay + 1
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;