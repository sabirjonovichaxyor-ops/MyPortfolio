// src/shared/ui/ConfirmationModal.tsx
import { useEffect } from 'react'
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  X,
  Trash2,
  ShieldAlert,
  AlertOctagon
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export type ConfirmationVariant = 
  | 'default' 
  | 'danger' 
  | 'warning' 
  | 'success' 
  | 'info'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  variant?: ConfirmationVariant
  isLoading?: boolean
  disableConfirm?: boolean
  disableCancel?: boolean
  showCloseButton?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children?: React.ReactNode
  onCancel?: () => void
}

const variantConfig = {
  default: {
    icon: AlertCircle,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    buttonConfirm: 'bg-blue-500 hover:bg-blue-600 text-white',
    buttonCancel: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
  },
  danger: {
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    buttonConfirm: 'bg-red-500 hover:bg-red-600 text-white',
    buttonCancel: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
  },
  warning: {
    icon: AlertOctagon,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    buttonConfirm: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    buttonCancel: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    buttonConfirm: 'bg-green-500 hover:bg-green-600 text-white',
    buttonCancel: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    buttonConfirm: 'bg-blue-500 hover:bg-blue-600 text-white',
    buttonCancel: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
  }
}

const sizeConfig = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Tasdiqlash',
  cancelText = 'Bekor qilish',
  variant = 'default',
  isLoading = false,
  disableConfirm = false,
  disableCancel = false,
  showCloseButton = true,
  size = 'md',
  children,
  onCancel
}: ConfirmationModalProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className={cn(
        "relative w-full rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border transform transition-all duration-300",
        config.borderColor,
        sizeConfig[size],
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      )}>
        {/* Header */}
        <div className={cn(
          "px-6 py-5 border-b rounded-t-2xl",
          config.bgColor,
          config.borderColor
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config.bgColor.replace('bg-', 'bg-')}`}>
                <Icon className={`w-6 h-6 ${config.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            </div>
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            {typeof message === 'string' ? (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {message}
              </p>
            ) : (
              message
            )}
          </div>

          {children && (
            <div className="mb-6">
              {children}
            </div>
          )}

          {/* Details for dangerous actions */}
          {variant === 'danger' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-700 dark:text-red-300">
                  <p className="font-medium mb-1">Diqqat!</p>
                  <p>Bu amalni ortga qaytarib bo'lmaydi. Barcha bog'liq ma'lumotlar o'chiriladi.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleCancel}
            disabled={isLoading || disableCancel}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-colors",
              config.buttonCancel,
              (isLoading || disableCancel) && "opacity-50 cursor-not-allowed"
            )}
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            disabled={isLoading || disableConfirm}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
              config.buttonConfirm,
              (isLoading || disableConfirm) && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Kutilmoqda...</span>
              </>
            ) : variant === 'danger' ? (
              <>
                <Trash2 className="w-4 h-4" />
                <span>{confirmText}</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Convenience components for specific use cases
export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "O'chirishni tasdiqlang",
  message = "Rostan ham ushbu ma'lumotni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.",
  itemName,
  itemType = "ma'lumot",
  ...props
}: Omit<ConfirmationModalProps, 'variant'> & {
  itemName?: string
  itemType?: string
}) {
  const fullMessage = itemName 
    ? `"${itemName}" ${itemType}ni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.`
    : message

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={fullMessage}
      variant="danger"
      confirmText="O'chirish"
      {...props}
    />
  )
}

export function SuccessConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Muvaffaqiyatli amal",
  message = "Amal muvaffaqiyatli bajarildi.",
  ...props
}: Omit<ConfirmationModalProps, 'variant'>) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      variant="success"
      confirmText="Davom etish"
      cancelText="Yopish"
      showCloseButton={false}
      {...props}
    />
  )
}

export function WarningConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Diqqat kerak",
  message = "Bu amal xavf tug'dirishi mumkin. Davom etishni xohlaysizmi?",
  ...props
}: Omit<ConfirmationModalProps, 'variant'>) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      message={message}
      variant="warning"
      confirmText="Davom etish"
      {...props}
    />
  )
}

// Hook for using confirmation modal
export function useConfirmation() {
  const [state, setState] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'default' as ConfirmationVariant,
    onConfirm: () => {},
    onCancel: () => {},
  })

  const show = (
    title: string,
    message: string,
    onConfirm: () => void,
    options?: {
      variant?: ConfirmationVariant
      onCancel?: () => void
    }
  ) => {
    setState({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm()
        setState(prev => ({ ...prev, isOpen: false }))
      },
      onCancel: () => {
        options?.onCancel?.()
        setState(prev => ({ ...prev, isOpen: false }))
      },
      variant: options?.variant || 'default'
    })
  }

  const Modal = () => (
    <ConfirmationModal
      isOpen={state.isOpen}
      onClose={() => setState(prev => ({ ...prev, isOpen: false }))}
      onConfirm={state.onConfirm}
      title={state.title}
      message={state.message}
      variant={state.variant}
      onCancel={state.onCancel}
    />
  )

  return { show, Modal }
}

// Default export
export default ConfirmationModal