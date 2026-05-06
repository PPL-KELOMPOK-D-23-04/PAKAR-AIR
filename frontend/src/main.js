import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import { useAuthStore } from '@/stores/authStore'

import App from './App.vue'
import router from './router'

import './assets/styles/main.css'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

// Init auth store
const authStore = useAuthStore()
authStore.initAuth()

// Axios Interceptor
axios.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('pakar_air_token') ||
    localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Auto logout kalau token invalid
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('pakar_air_token')
      localStorage.removeItem('pakar_air_refresh_token')
      localStorage.removeItem('pakar_air_user')

      delete axios.defaults.headers.common.Authorization

      router.push('/login')
    }

    return Promise.reject(error)
  }
)

app.mount('#app')