import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('pakar_air_user') || 'null'),
    token: sessionStorage.getItem('pakar_air_token') || sessionStorage.getItem('token') || null,
    refreshToken: sessionStorage.getItem('pakar_air_refresh_token') || null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.user,
    isAdmin: (state) => !!state.user?.is_admin,
  },

  actions: {
    async login(email, password) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post(`${API_BASE}/api/auth/login`, {
          email,
          password,
        })

        const { access_token, refresh_token, user_id, email: user_email, full_name, is_admin } = response.data

        this.token = access_token
        this.refreshToken = refresh_token
        this.user = {
          id: user_id,
          email: user_email || email,
          full_name: full_name || user_email || email,
          is_admin: is_admin || false,
        }

        sessionStorage.setItem('token', access_token)
        sessionStorage.setItem('pakar_air_token', access_token)
        sessionStorage.setItem('pakar_air_refresh_token', refresh_token)
        sessionStorage.setItem('pakar_air_user', JSON.stringify(this.user))

        // Set default auth header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

        return { success: true, isAdmin: is_admin || false }
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
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('pakar_air_token')
      sessionStorage.removeItem('pakar_air_refresh_token')
      sessionStorage.removeItem('pakar_air_user')
      delete axios.defaults.headers.common['Authorization']
    },

    initAuth() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    },
  },
})
