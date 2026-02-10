import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./useAuth"

type Props = {
  role?: string
  children?: React.ReactNode
}

export default function RequireRole({ role = "admin", children }: Props) {
  const { isAdmin } = useAuth()

  if (!isAdmin) return <Navigate to="/" replace />

  return <>{children || <Outlet />}</>
}
