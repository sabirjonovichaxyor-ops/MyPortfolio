import React from 'react'

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'loading'

export interface Toast {
  id: string
  title: string
  message?: string
  type: ToastType
  duration?: number
  icon?: React.ReactNode
  onClose?: () => void
  createdAt: number
}

export interface ToastOptions {
  title: string
  message?: string
  duration?: number
  icon?: React.ReactNode
  onClose?: () => void
}

export interface ToastContextType {
  toasts: Toast[]

  show: (type: ToastType, options: ToastOptions) => string
  update: (id: string, options: Partial<Omit<Toast, 'id' | 'createdAt'>>) => void

  dismiss: (id: string) => void
  dismissAll: () => void

  success: (options: ToastOptions) => string
  error: (options: ToastOptions) => string
  warning: (options: ToastOptions) => string
  info: (options: ToastOptions) => string
  loading: (options: ToastOptions) => string
}
