import { useEffect, useState } from "react"

const ADMIN_KEY = "portfolio_admin_access"

export const useAdminAccess = (p0: { devOnly: boolean }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem(ADMIN_KEY) === "true"
  })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault()
        setIsAdmin(true)
        localStorage.setItem(ADMIN_KEY, "true")
        window.dispatchEvent(new Event("adminActivated"))
        console.info("🛡 Admin mode enabled")
      }
    }

    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  const logoutAdmin = () => {
    setIsAdmin(false)
    localStorage.removeItem(ADMIN_KEY)
  }

  return { isAdmin, logoutAdmin }
}
