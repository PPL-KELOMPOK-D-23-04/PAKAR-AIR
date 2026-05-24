import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  },
})

// Request interceptor — attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('pakar_air_token') || sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle auth errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('pakar_air_token')
      sessionStorage.removeItem('pakar_air_refresh_token')
      sessionStorage.removeItem('pakar_air_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient