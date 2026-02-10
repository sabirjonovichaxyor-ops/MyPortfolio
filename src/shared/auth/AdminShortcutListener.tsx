import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AdminShortcutListener: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const onAdmin = () => {
      try {
        navigate('/admin')
      } catch (e) {
        console.warn('Failed to navigate to /admin', e)
      }
    }

    window.addEventListener('adminActivated', onAdmin)
    return () => window.removeEventListener('adminActivated', onAdmin)
  }, [navigate])

  return null
}

export default AdminShortcutListener
