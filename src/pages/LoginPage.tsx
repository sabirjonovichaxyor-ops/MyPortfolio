import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock } from "lucide-react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { useAuth } from "../shared/auth/useAuth"

const DEV_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin2024"

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((r) => setTimeout(r, 800))

    if (password === DEV_ADMIN_PASSWORD) {
      login({ role: "admin", isDevAdmin: true })
      toast.success("Login successful")
      navigate("/admin")
    } else {
      toast.error("Incorrect password")
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
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-500">Enter your password</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
            {loading ? "Checking..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
