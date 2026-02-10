import { motion } from "framer-motion"
import { ProjectStatus } from "@/entities/project/model/ProjectStatus"

export type ProjectStatusType = ProjectStatus

const statusConfig: Record<ProjectStatusType, {
  label: string
  gradient: string
  text: string
  icon?: React.ReactNode
}> = {
  [ProjectStatus.PUBLISHED]: {
    label: "Published",
    gradient: "from-emerald-500 to-green-500",
    text: "text-emerald-100",
    icon: "✅"
  },
  [ProjectStatus.IN_PROGRESS]: {
    label: "In Progress",
    gradient: "from-blue-500 to-cyan-500",
    text: "text-blue-100",
    icon: "⚡"
  },
  [ProjectStatus.DRAFT]: {
    label: "Draft",
    gradient: "from-amber-500 to-orange-500",
    text: "text-amber-100",
    icon: "📝"
  },
  [ProjectStatus.PLANNING]: {
    label: "Planning",
    gradient: "from-purple-500 to-pink-500",
    text: "text-purple-100",
    icon: "📋"
  },
  [ProjectStatus.ARCHIVED]: {
    label: "Archived",
    gradient: "from-gray-500 to-gray-600",
    text: "text-gray-100",
    icon: "📁"
  }
}

export function ProjectStatusBadge({ status }: { status: ProjectStatusType }) {
  const config = statusConfig[status]
  
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.gradient} ${config.text} text-xs font-semibold shadow-sm`}
    >
      {config.icon && <span>{config.icon}</span>}
      {config.label}
    </motion.span>
  )
}