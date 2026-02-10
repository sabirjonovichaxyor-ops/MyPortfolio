import { useCallback, useEffect, useRef, useState } from 'react'
import { Toast, ToastOptions, ToastType } from './types'

const MAX_TOASTS = 5

const getId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`

export const useToastStore = () => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const clearTimer = (id: string) => {
    if (timeouts.current[id]) {
      clearTimeout(timeouts.current[id])
      delete timeouts.current[id]
    }
  }

  const dismiss = useCallback((id: string) => {
    setToasts(prev => {
      const toast = prev.find(t => t.id === id)
      toast?.onClose?.()
      return prev.filter(t => t.id !== id)
    })
    clearTimer(id)
  }, [])

  const dismissAll = useCallback(() => {
    Object.keys(timeouts.current).forEach(clearTimer)
    setToasts([])
  }, [])

  const scheduleAutoDismiss = (
    id: string,
    type: ToastType,
    duration?: number
  ) => {
    if (type === 'loading' || duration === 0) return

    timeouts.current[id] = setTimeout(
      () => dismiss(id),
      duration ?? (type === 'error' ? 5000 : 3000)
    )
  }

  const show = useCallback(
    (type: ToastType, options: ToastOptions) => {
      const id = getId()

      const toast: Toast = {
        id,
        title: options.title,
        type,
        createdAt: Date.now(),

        ...(options.message !== undefined && { message: options.message }),
        ...(options.icon !== undefined && { icon: options.icon }),
        ...(options.duration !== undefined && { duration: options.duration }),
        ...(options.onClose !== undefined && { onClose: options.onClose }),
      }


      setToasts(prev => [...prev.slice(-MAX_TOASTS + 1), toast])
      scheduleAutoDismiss(id, type, options.duration)

      return id
    },
    [dismiss]
  )

  const update = useCallback(
    (id: string, options: Partial<Omit<Toast, 'id' | 'createdAt'>>) => {
      setToasts(prev =>
        prev.map(t => (t.id === id ? { ...t, ...options } : t))
      )

      if (options.type || options.duration !== undefined) {
        clearTimer(id)
        scheduleAutoDismiss(
          id,
          options.type ?? 'info',
          options.duration
        )
      }
    },
    [dismiss]
  )

  useEffect(() => dismissAll, [dismissAll])

  return {
    toasts,
    show,
    update,
    dismiss,
    dismissAll,
    success: (o: ToastOptions) => show('success', o),
    error: (o: ToastOptions) => show('error', o),
    warning: (o: ToastOptions) => show('warning', o),
    info: (o: ToastOptions) => show('info', o),
    loading: (o: ToastOptions) =>
      show('loading', { ...o, duration: 0 }),
  }
}
