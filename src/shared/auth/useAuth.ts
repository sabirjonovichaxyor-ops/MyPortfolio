import { useAuthContext } from "./AuthProvider"

export const useAuth = () => {
  const auth = useAuthContext()

  return {
    ...auth,
    isAdmin: auth.user?.role === "admin",
  }
}
