import { useState, useMemo } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { useAuth } from "./useAuth"
import type { AuthUser } from "./AuthProvider"

const DEV_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin2024"

export const AdminGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, login } = useAuth()

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const canAccess = useMemo(() => isAdmin, [isAdmin])

  if (canAccess) return <>{children}</>

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((r) => setTimeout(r, 800))

    if (password === DEV_ADMIN_PASSWORD) {
      const adminUser: AuthUser = {
        id: 'dev-admin',
        email: 'dev@localhost',
        role: 'admin',
        isDevAdmin: true,
        displayName: 'Dev Admin',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      }
      
      login(adminUser)
      toast.success("Admin mode enabled")
    } else {
      toast.error("Noto'g'ri parol")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-purple-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <Lock className="text-indigo-600 dark:text-indigo-400 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-500">Parol kiriting</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              required
              className="w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default AdminGate
