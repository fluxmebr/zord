import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Apenas dados não-sensíveis são persistidos no localStorage.
// Tokens de acesso ficam em httpOnly cookies gerenciados pelo servidor.
interface User {
  id: string
  tenantId: string
  email: string
  name: string
  role: string
  language: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setAuth: (user: User) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user) => set({ user, isAuthenticated: true }),
      clearAuth: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'zord_user',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
