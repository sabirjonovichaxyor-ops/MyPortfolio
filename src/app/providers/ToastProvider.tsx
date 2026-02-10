import { ToastContext } from '@/shared/context/toast'
import { useToastStore } from '@/shared/context/toast/toast.store'
import { ToastContainer } from '@/shared/ui/ui-decorative/ToastContainer'

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useToastStore()

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}
