<template>
  <div class="login-root">
    <!-- Background animated blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- Card -->
    <div class="login-card">
      <!-- Logo & Title -->
      <div class="login-header">
        <RouterLink to="/" class="logo-link">
          <div class="logo-icon">💧</div>
          <span class="logo-text">PAKAR-AIR</span>
        </RouterLink>
        <h1 class="login-title">Selamat Datang Kembali</h1>
        <p class="login-subtitle">Masuk untuk mengakses fitur analisis kualitas air</p>
      </div>

      <!-- Form -->
      <form class="login-form" @submit.prevent="handleLogin" novalidate>
        <!-- Email -->
        <div class="form-group" :class="{ 'has-error': fieldErrors.email }">
          <label for="email" class="form-label">
            <MailIcon class="label-icon" />
            Email
          </label>
          <div class="input-wrapper">
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="contoh@email.com"
              autocomplete="email"
              :disabled="authStore.isLoading"
              @input="fieldErrors.email = ''"
            />
          </div>
          <span v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</span>
        </div>

        <!-- Password -->
        <div class="form-group" :class="{ 'has-error': fieldErrors.password }">
          <label for="password" class="form-label">
            <LockIcon class="label-icon" />
            Password
          </label>
          <div class="input-wrapper">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="Masukkan password"
              autocomplete="current-password"
              :disabled="authStore.isLoading"
              @input="fieldErrors.password = ''"
            />
            <button
              type="button"
              class="password-toggle"
              :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
              @click="showPassword = !showPassword"
            >
              <EyeOffIcon v-if="showPassword" class="eye-icon" />
              <EyeIcon v-else class="eye-icon" />
            </button>
          </div>
          <span v-if="fieldErrors.password" class="field-error">{{ fieldErrors.password }}</span>
        </div>

        <!-- Global Error -->
        <Transition name="shake">
          <div v-if="authStore.error" class="global-error" role="alert">
            <AlertCircleIcon class="error-icon" />
            <span>{{ authStore.error }}</span>
          </div>
        </Transition>

        <!-- Submit -->
        <button
          id="btn-login"
          type="submit"
          class="btn-submit"
          :disabled="authStore.isLoading"
        >
          <span v-if="authStore.isLoading" class="btn-loader">
            <span class="spinner"></span>
            Memproses...
          </span>
          <span v-else class="btn-label">
            <LogInIcon class="btn-icon" />
            Masuk
          </span>
        </button>
      </form>

      <!-- Back to landing -->
      <div class="login-footer">
        <RouterLink to="/" class="back-link">
          <ArrowLeftIcon class="back-icon" />
          Kembali ke Beranda
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
  AlertCircleIcon,
  ArrowLeftIcon,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const showPassword = ref(false)
const fieldErrors = reactive({ email: '', password: '' })

function validate() {
  let valid = true
  if (!form.email) {
    fieldErrors.email = 'Email tidak boleh kosong.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    fieldErrors.email = 'Format email tidak valid.'
    valid = false
  }
  if (!form.password) {
    fieldErrors.password = 'Password tidak boleh kosong.'
    valid = false
  } else if (form.password.length < 6) {
    fieldErrors.password = 'Password minimal 6 karakter.'
    valid = false
  }
  return valid
}

async function handleLogin() {
  authStore.error = null
  if (!validate()) return

  const result = await authStore.login(form.email, form.password)
  if (result.success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped src="@/assets/styles/pages/login.css"></style>
