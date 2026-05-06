import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('pakar_air_user') || 'null'),
    token: localStorage.getItem('pakar_air_token') || null,
    refreshToken: localStorage.getItem('pakar_air_refresh_token') || null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    async register(data) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(`${API_BASE}/api/auth/register`, data)
        return { success: true, message: response.data?.message || 'Registration successful' }
      } catch (err) {
        const message = err.response?.data?.detail || err.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.'
        this.error = message
        return { success: false, message }
      } finally {
        this.isLoading = false
      }
    },
    async login(email, password) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(`${API_BASE}/api/auth/login`, {
          email,
          password,
        })

        const { access_token, refresh_token, user } = response.data

        this.token = access_token
        this.refreshToken = refresh_token
        this.user = user || { email }

        localStorage.setItem('pakar_air_token', access_token)
        localStorage.setItem('pakar_air_refresh_token', refresh_token)
        localStorage.setItem('pakar_air_user', JSON.stringify(this.user))

        // Set default auth header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

        return { success: true }
      } catch (err) {
        const message =
          err.response?.data?.detail ||
          err.response?.data?.message ||
          'Email atau password salah. Silakan coba lagi.'
        this.error = message
        return { success: false, message }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true
      try {
        await axios.post(
          `${API_BASE}/api/auth/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${this.token}` },
          },
        )
      } catch {
        // Even if server logout fails, clear local state
      } finally {
        this._clearSession()
        this.isLoading = false
      }
    },

    _clearSession() {
      this.user = null
      this.token = null
      this.refreshToken = null
      this.error = null
      localStorage.removeItem('pakar_air_token')
      localStorage.removeItem('pakar_air_refresh_token')
      localStorage.removeItem('pakar_air_user')
      delete axios.defaults.headers.common['Authorization']
    },

    initAuth() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    },
  },
})
