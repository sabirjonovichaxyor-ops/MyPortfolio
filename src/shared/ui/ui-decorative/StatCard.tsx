import { motion } from "framer-motion"
import { useTheme } from "@/features/theme"

type StatCardProps = {
  title: string
  value: string | number
  icon: React.ComponentType<any>
  color?: "blue" | "green" | "purple" | "orange" | "red"
  label: string
}

const colorMap = {
  blue: {
    light: {
      border: "border-l-blue-500",
      bg: "bg-gradient-to-br from-blue-50 via-white to-blue-100/30",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
      iconText: "text-white",
      text: "text-blue-700",
      value: "text-blue-900",
      shadow: "shadow-blue-200/50",
      glow: "shadow-lg shadow-blue-500/10",
    },
    dark: {
      border: "border-l-blue-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/20",
      iconBg: "bg-gradient-to-br from-blue-600 to-cyan-600",
      iconText: "text-white",
      text: "text-blue-300",
      value: "text-blue-100",
      shadow: "shadow-blue-900/30",
      glow: "shadow-lg shadow-blue-500/20",
    }
  },
  green: {
    light: {
      border: "border-l-emerald-500",
      bg: "bg-gradient-to-br from-emerald-50 via-white to-emerald-100/30",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
      iconText: "text-white",
      text: "text-emerald-700",
      value: "text-emerald-900",
      shadow: "shadow-emerald-200/50",
      glow: "shadow-lg shadow-emerald-500/10",
    },
    dark: {
      border: "border-l-emerald-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900/20",
      iconBg: "bg-gradient-to-br from-emerald-600 to-green-600",
      iconText: "text-white",
      text: "text-emerald-300",
      value: "text-emerald-100",
      shadow: "shadow-emerald-900/30",
      glow: "shadow-lg shadow-emerald-500/20",
    }
  },
  purple: {
    light: {
      border: "border-l-purple-500",
      bg: "bg-gradient-to-br from-purple-50 via-white to-purple-100/30",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
      iconText: "text-white",
      text: "text-purple-700",
      value: "text-purple-900",
      shadow: "shadow-purple-200/50",
      glow: "shadow-lg shadow-purple-500/10",
    },
    dark: {
      border: "border-l-purple-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20",
      iconBg: "bg-gradient-to-br from-purple-600 to-violet-600",
      iconText: "text-white",
      text: "text-purple-300",
      value: "text-purple-100",
      shadow: "shadow-purple-900/30",
      glow: "shadow-lg shadow-purple-500/20",
    }
  },
  orange: {
    light: {
      border: "border-l-orange-500",
      bg: "bg-gradient-to-br from-orange-50 via-white to-orange-100/30",
      iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
      iconText: "text-white",
      text: "text-orange-700",
      value: "text-orange-900",
      shadow: "shadow-orange-200/50",
      glow: "shadow-lg shadow-orange-500/10",
    },
    dark: {
      border: "border-l-orange-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900/20",
      iconBg: "bg-gradient-to-br from-orange-600 to-amber-600",
      iconText: "text-white",
      text: "text-orange-300",
      value: "text-orange-100",
      shadow: "shadow-orange-900/30",
      glow: "shadow-lg shadow-orange-500/20",
    }
  },
  red: {
    light: {
      border: "border-l-rose-500",
      bg: "bg-gradient-to-br from-rose-50 via-white to-rose-100/30",
      iconBg: "bg-gradient-to-br from-rose-500 to-red-500",
      iconText: "text-white",
      text: "text-rose-700",
      value: "text-rose-900",
      shadow: "shadow-rose-200/50",
      glow: "shadow-lg shadow-rose-500/10",
    },
    dark: {
      border: "border-l-rose-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-rose-900/20",
      iconBg: "bg-gradient-to-br from-rose-600 to-red-600",
      iconText: "text-white",
      text: "text-rose-300",
      value: "text-rose-100",
      shadow: "shadow-rose-900/30",
      glow: "shadow-lg shadow-rose-500/20",
    }
  },
} as const

export function StatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  label,
}: StatCardProps) {
  const { isDark } = useTheme()
  const themeStyles = colorMap[color][isDark ? 'dark' : 'light']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -6,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      transition={{ duration: 0.3 }}
      className={`
        relative rounded-2xl p-6 overflow-hidden
        ${themeStyles.bg}
        border ${themeStyles.border}
        ${themeStyles.glow}
        shadow-xl ${themeStyles.shadow}
        transition-all duration-300
        group
      `}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current" />
      </div>

      {/* Animated border effect */}
      <div className={`absolute top-0 left-0 w-1 h-full ${themeStyles.border} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title */}
            <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${themeStyles.text} opacity-80`}>
              {title}
            </p>

            {/* Value with gradient text */}
            <div className="relative mb-1">
              <h3 className={`text-3xl lg:text-4xl font-bold ${themeStyles.value} leading-tight`}>
                {value}
              </h3>
              {/* Subtle gradient underline */}
              <div className={`h-0.5 w-12 mt-1 ${themeStyles.border.replace('border-l-', 'bg-gradient-to-r from-')} opacity-50`} />
            </div>

            {/* Label */}
            <p className={`text-sm font-medium ${themeStyles.text} opacity-90 mt-2`}>
              {label}
            </p>
          </div>

          {/* Icon container with gradient and animation */}
          <div className="relative ml-4">
            {/* Outer glow */}
            <div className={`absolute inset-0 rounded-2xl ${themeStyles.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Icon container */}
            <motion.div
              whileHover={{ rotate: 5 }}
              className={`
                relative w-14 h-14 rounded-2xl
                ${themeStyles.iconBg}
                flex items-center justify-center
                shadow-lg
                transition-all duration-300
                group-hover:scale-110 group-hover:shadow-xl
              `}
            >
              <Icon className={`w-7 h-7 ${themeStyles.iconText}`} />
              
              {/* Reflection effect */}
              <div className="absolute top-1 left-1 right-1 h-1/2 rounded-t-2xl bg-white/10" />
            </motion.div>

            {/* Corner decoration */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-white/20 dark:border-gray-700/30 rounded-br-2xl" />
          </div>
        </div>

        {/* Progress indicator (optional) */}
        <div className="mt-6">
          <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`h-full ${themeStyles.border.replace('border-l-', 'bg-gradient-to-r from-')}`}
            />
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-white/0 dark:via-black/0 dark:to-black/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

export default StatCard