// src/app/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import PublicPage from '../pages/PublicPage'
import AdminPage from '../pages/AdminPage'  // Bu nested routing uchun wrapper
import LoginPage from '../pages/LoginPage'
import ForbiddenPage from '../pages/ForbiddenPage'
import RequireAuth from '../shared/auth/RequireAuth'
import RequireRole from '../shared/auth/RequireRole'
import AdminGate from '../shared/auth/AdminGate'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <div>Page not found</div>,
    children: [
      {
        index: true,
        element: <PublicPage />,
      },
      {
        path: 'projects',
        element: <PublicPage />,  // Projects componenti PublicPage orqali ishlaydi
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/403',
    element: <ForbiddenPage />,
  },
  {
    path: '/admin',
    element: (
      <RequireAuth>
        <AdminGate>
          <RequireRole role="admin">
            <AdminLayout />
          </RequireRole>
        </AdminGate>
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,  // Bu wrapper bo'ladi
      },
      // Yangi: Har bir admin sahifa uchun alohida route
      {
        path: 'blog',
        element: <AdminPage />,  // AdminPage ichida Blog tab ko'rinadi
      },
      {
        path: 'messages',
        element: <AdminPage />,  // AdminPage ichida Messages tab ko'rinadi
      },
      {
        path: 'users',
        element: <AdminPage />,  // AdminPage ichida Users tab ko'rinadi
      },
      {
        path: 'projects',
        element: <AdminPage />,  // Keyinchalik Projects uchun
      },
      {
        path: 'analytics',
        element: <AdminPage />,  // Keyinchalik Analytics uchun
      },
      {
        path: 'settings',
        element: <AdminPage />,  // Keyinchalik Settings uchun
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />
}