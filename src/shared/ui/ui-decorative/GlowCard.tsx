import React from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '',
  glowColor = 'blue'
}) => {
  const glowColors = {
    blue: 'shadow-blue-500/25 hover:shadow-blue-500/40',
    purple: 'shadow-purple-500/25 hover:shadow-purple-500/40',
    green: 'shadow-green-500/25 hover:shadow-green-500/40',
    pink: 'shadow-pink-500/25 hover:shadow-pink-500/40',
    orange: 'shadow-orange-500/25 hover:shadow-orange-500/40'
  };

  return (
    <motion.div
      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl ${glowColors[glowColor as keyof typeof glowColors]} transition-all duration-300 ${className}`}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

export default GlowCard;