import { Sun, Moon, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useThemeContext } from "../../features/theme/model/theme-context"

export default function AdminHeader() {
  const { theme, toggleTheme } = useThemeContext()
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate("/") // Home page
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>

        <button
          onClick={handleBackHome}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
    </header>
  )
}
