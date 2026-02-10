import { useToast } from '@/shared/hooks/useToast'
import type { Toast } from '@/shared/context/toast'
import { cn } from '@/shared/utils/cn'
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Loader2,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  loading: Loader2,
}

export function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[1000] flex flex-col gap-3 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = toastIcons[toast.type]

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'relative rounded-xl border shadow-lg overflow-hidden'
              )}
            >
              {toast.type !== 'loading' && toast.duration !== 0 && (
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-current opacity-20"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{
                    duration: (toast.duration ?? 3000) / 1000,
                    ease: 'linear',
                  }}
                />
              )}

              <div className="p-4 flex items-start gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">
                    {toast.title}
                  </h4>

                  {toast.message && (
                    <p className="text-sm mt-1 opacity-90">
                      {toast.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => dismiss(toast.id)}
                  className="p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
