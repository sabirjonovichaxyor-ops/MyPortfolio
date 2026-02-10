import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail, Download } from 'lucide-react'

import { trackPageView } from '@/shared/api/analyticsApi'
import AnimatedSection from '@/shared/ui/ui-decorative/AnimatedSection'
import FloatingElements from '@/shared/ui/ui-decorative/FloatingElements'
import TypewriterText from '@/shared/ui/ui-decorative/TypewriterText'

import { useHomeContent } from '../model/useHomeContent'
import { socials } from '@/shared/config/socials'

const Home = () => {
  const content = useHomeContent()

  useEffect(() => {
    trackPageView('home')
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br
          from-blue-50 via-indigo-50 to-purple-50
          dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30"
        animate={{
          background: [
            'linear-gradient(135deg, rgb(239 246 255) 0%, rgb(238 242 255) 50%, rgb(250 245 255) 100%)',
            'linear-gradient(135deg, rgb(219 234 254) 0%, rgb(221 214 254) 50%, rgb(243 232 255) 100%)',
            'linear-gradient(135deg, rgb(239 246 255) 0%, rgb(238 242 255) 50%, rgb(250 245 255) 100%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <FloatingElements />

      <AnimatedSection className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Avatar */}
        <motion.div
          className="w-64 h-64 mx-auto mt-4 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Glow */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <motion.div
            className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/images/Axyor1.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />

            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6
            bg-[length:200%_200%]
            bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600
            bg-clip-text text-transparent
            dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.span
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600
              bg-clip-text text-transparent
              dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {content.name.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Roles */}
        <motion.div
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-500 mb-4 h-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <TypewriterText texts={content.roles} />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {content.aboutMe}
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600
              text-white rounded-full font-semibold shadow-lg hover:shadow-xl
              transform hover:-translate-y-1 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              {content.actions.contact}
            </span>
          </motion.a>

          <motion.button
            className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-400 rounded-full font-semibold
              hover:border-blue-500 hover:text-blue-600
              dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              {content.actions.download}
            </span>
          </motion.button>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="flex justify-center space-x-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          {socials.map(({ Icon, url }, i) => (
            <motion.a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                rounded-full shadow-lg hover:shadow-xl
                text-gray-600 dark:text-gray-300
                hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll */}
        <motion.div
          className="animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <ArrowDown className="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500" />
        </motion.div>
      </AnimatedSection>
    </section>
  )
}

export default Home
