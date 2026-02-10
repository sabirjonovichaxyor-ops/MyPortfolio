import { Outlet } from 'react-router-dom'
import Navigation from '../features/navigation/ui/Navigation'
import Footer from './ui/Footer'
import AdminShortcutListener from '../shared/auth/AdminShortcutListener'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminShortcutListener />
      <Navigation />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout
