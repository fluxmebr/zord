import axios from 'axios'

// Tokens são enviados via httpOnly cookies (withCredentials: true).
// Nenhum token é armazenado em localStorage — proteção contra XSS.
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  withCredentials: true,  // envia/recebe cookies httpOnly automaticamente
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})

// Mutex para evitar múltiplos refreshes simultâneos
let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push(() => resolve(api.request(originalRequest)))
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Cookie de refresh é enviado automaticamente pelo browser
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/v1/auth/refresh`,
          {},
          { withCredentials: true },
        )
        refreshQueue.forEach((cb) => cb(''))
        refreshQueue = []
        return api.request(originalRequest)
      } catch {
        refreshQueue = []
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)
