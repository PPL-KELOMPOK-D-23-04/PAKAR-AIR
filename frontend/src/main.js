import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// ── Axios Interceptor ─────────────────────────────────────────────
// Setiap request otomatis menyertakan token milik user yang sedang login.
// Tanpa ini, semua user akan dianggap sama oleh backend.

axios.interceptors.request.use((config) => {
  const token =
    sessionStorage.getItem('pakar_air_token') ||
    sessionStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Kalau backend kembalikan 401 (token expired/invalid), otomatis logout
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('pakar_air_token')
      sessionStorage.removeItem('pakar_air_refresh_token')
      sessionStorage.removeItem('pakar_air_user')
      delete axios.defaults.headers.common['Authorization']
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

app.mount('#app')
