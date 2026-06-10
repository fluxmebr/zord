import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('zord_access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('zord_refresh_token')
      if (refreshToken) {
        try {
          const { data } = await axios.post('/api/v1/auth/refresh', { refreshToken })
          localStorage.setItem('zord_access_token', data.data.accessToken)
          localStorage.setItem('zord_refresh_token', data.data.refreshToken)
          error.config.headers.Authorization = `Bearer ${data.data.accessToken}`
          return api.request(error.config)
        } catch {
          localStorage.removeItem('zord_access_token')
          localStorage.removeItem('zord_refresh_token')
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  },
)
