import React, { createContext, useContext, useMemo, useState, useEffect } from "react"
import { useAdminAccess } from "./useAdminAccess"

export type Role = "user" | "admin"

type AuthUser = {
  id?: string
  email?: string
  role: Role
  isDevAdmin?: boolean
}

type AuthContextType = {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  const { isAdmin, logoutAdmin } = useAdminAccess({ devOnly: false })

  // 🔥 AUTO PROMOTE DEV ADMIN
  useEffect(() => {
    if (isAdmin && !user) {
      setUser({ role: "admin", isDevAdmin: true })
    }
  }, [isAdmin])

  const login = (user: AuthUser) => setUser(user)

  const logout = () => {
    setUser(null)
    logoutAdmin()
  }

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be inside AuthProvider")
  return ctx
}
