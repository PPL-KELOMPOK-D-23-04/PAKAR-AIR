<template>
  <div class="register-root">
    <!-- Background blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- Card -->
    <div class="register-card">
      <!-- Header -->
      <div class="register-header">
        <RouterLink to="/" class="logo-link">
          <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="PAKAR-AIR logo" class="logo-img" />
          <span class="logo-text">PAKAR-AIR</span>
        </RouterLink>
        <h1 class="register-title">Buat Akun Baru</h1>
        <p class="register-subtitle">Daftar untuk mulai menganalisis kualitas air</p>
      </div>

      <!-- Form -->
      <form class="register-form" @submit.prevent="handleRegister" novalidate>

        <!-- Full Name -->
        <div class="form-group" :class="{ 'has-error': fieldErrors.full_name }">
          <label for="full_name" class="form-label">
            <UserIcon class="label-icon" />
            Nama Lengkap
          </label>
          <input
            id="full_name"
            v-model="form.full_name"
            type="text"
            class="form-input"
            placeholder="Nama lengkap Anda"
            :disabled="isLoading"
            @input="fieldErrors.full_name = ''"
          />
          <span v-if="fieldErrors.full_name" class="field-error">{{ fieldErrors.full_name }}</span>
        </div>

        <!-- Username -->
        <div class="form-group" :class="{ 'has-error': fieldErrors.username }">
          <label for="username" class="form-label">
            <AtSignIcon class="label-icon" />
            Username
          </label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="form-input"
            placeholder="username (min 3 karakter)"
            :disabled="isLoading"
            @input="fieldErrors.username = ''"
          />
          <span v-if="fieldErrors.username" class="field-error">{{ fieldErrors.username }}</span>
        </div>

        <!-- Email -->
        <div class="form-group" :class="{ 'has-error': fieldErrors.email }">
          <label for="email" class="form-label">
            <MailIcon class="label-icon" />
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input"
            placeholder="contoh@email.com"
            autocomplete="email"
            :disabled="isLoading"
            @input="fieldErrors.email = ''"
          />
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
              placeholder="Minimal 6 karakter"
              :disabled="isLoading"
              @input="fieldErrors.password = ''"
            />
            <button
              type="button"
              class="password-toggle"
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
          <div v-if="errorMessage" class="global-error" role="alert">
            <AlertCircleIcon class="error-icon" />
            <span>{{ errorMessage }}</span>
          </div>
        </Transition>

        <!-- Success -->
        <Transition name="fade">
          <div v-if="successMessage" class="global-success" role="status">
            <CheckCircleIcon class="success-icon" />
            <span>{{ successMessage }}</span>
          </div>
        </Transition>

        <!-- Submit -->
        <button
          type="submit"
          class="btn-submit"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="btn-loader">
            <span class="spinner"></span>
            Memproses...
          </span>
          <span v-else class="btn-label">
            <UserPlusIcon class="btn-icon" />
            Daftar Sekarang
          </span>
        </button>
      </form>

      <!-- Footer -->
      <div class="register-footer">
        <p class="login-text">
          Sudah punya akun?
          <RouterLink to="/login" class="login-link">Masuk di sini</RouterLink>
        </p>
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
import { useAuthStore } from '@/stores/authStore'
import {
  UserIcon,
  AtSignIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  UserPlusIcon,
  ArrowLeftIcon,
} from 'lucide-vue-next'

const router = useRouter()
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const form = reactive({
  full_name: '',
  username: '',
  email: '',
  password: '',
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const fieldErrors = reactive({
  full_name: '',
  username: '',
  email: '',
  password: '',
})

function validate() {
  let valid = true

  if (!form.full_name.trim()) {
    fieldErrors.full_name = 'Nama lengkap tidak boleh kosong.'
    valid = false
  }

  if (!form.username.trim()) {
    fieldErrors.username = 'Username tidak boleh kosong.'
    valid = false
  } else if (form.username.length < 3) {
    fieldErrors.username = 'Username minimal 3 karakter.'
    valid = false
  } else if (form.username.length > 50) {
    fieldErrors.username = 'Username maksimal 50 karakter.'
    valid = false
  }

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

const authStore = useAuthStore()

async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''
  if (!validate()) return

  isLoading.value = true
  try {
    const payload = {
      email: form.email,
      password: form.password,
      full_name: form.full_name,
      username: form.username,
    }

    const res = await authStore.register(payload)
    if (res.success) {
      successMessage.value = 'Akun berhasil dibuat! Mengarahkan ke halaman login...'
      setTimeout(() => {
        router.push('/login')
      }, 1200)
    } else {
      errorMessage.value = res.message || 'Gagal mendaftar. Silakan coba lagi.'
    }
  } catch (err) {
    errorMessage.value = 'Gagal mendaftar. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2d52 100%);
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
  animation: float 8s ease-in-out infinite;
}
.blob-1 { width: 500px; height: 500px; background: radial-gradient(circle, #3b82f6, #1d4ed8); top: -150px; left: -150px; animation-delay: 0s; }
.blob-2 { width: 400px; height: 400px; background: radial-gradient(circle, #06b6d4, #0284c7); bottom: -100px; right: -100px; animation-delay: 3s; }
.blob-3 { width: 300px; height: 300px; background: radial-gradient(circle, #818cf8, #6366f1); top: 50%; left: 60%; animation-delay: 5s; }

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

.register-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 440px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.register-header { text-align: center; margin-bottom: 2rem; }

.logo-link {
  display: inline-flex; align-items: center; gap: 0.5rem;
  text-decoration: none; margin-bottom: 1.5rem;
}
.logo-icon {
  width: 2.5rem; height: 2.5rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 12px; display: flex; align-items: center;
  justify-content: center; font-size: 1.25rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
.logo-text { font-size: 1.25rem; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
.register-title { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem; }
.register-subtitle { font-size: 0.875rem; color: rgba(255,255,255,0.55); margin: 0; }

.register-form { display: flex; flex-direction: column; gap: 1.25rem; }

.form-group { display: flex; flex-direction: column; gap: 0.4rem; }

.form-label {
  display: flex; align-items: center; gap: 0.375rem;
  font-size: 0.8rem; font-weight: 600;
  color: rgba(255,255,255,0.7); letter-spacing: 0.3px; text-transform: uppercase;
}
.label-icon { width: 0.875rem; height: 0.875rem; opacity: 0.8; }

.input-wrapper { position: relative; }

.form-input {
  width: 100%;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: #fff; font-size: 0.95rem;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  outline: none; box-sizing: border-box;
}
.form-input::placeholder { color: rgba(255,255,255,0.3); }
.form-input:focus {
  border-color: #3b82f6;
  background: rgba(59,130,246,0.08);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
}
.form-input:disabled { opacity: 0.5; cursor: not-allowed; }
.has-error .form-input { border-color: #f87171; background: rgba(248,113,113,0.07); }

.password-toggle {
  position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.4); padding: 0.25rem;
  display: flex; transition: color 0.2s;
}
.password-toggle:hover { color: rgba(255,255,255,0.8); }
.eye-icon { width: 1.1rem; height: 1.1rem; }

.field-error { font-size: 0.75rem; color: #fca5a5; padding-left: 0.25rem; }

.global-error {
  display: flex; align-items: center; gap: 0.5rem;
  background: rgba(239,68,68,0.12);
  border: 1px solid rgba(239,68,68,0.3);
  border-radius: 10px; padding: 0.75rem 1rem;
  color: #fca5a5; font-size: 0.85rem;
}
.error-icon { width: 1rem; height: 1rem; flex-shrink: 0; }

.global-success {
  display: flex; align-items: center; gap: 0.5rem;
  background: rgba(34,197,94,0.12);
  border: 1px solid rgba(34,197,94,0.3);
  border-radius: 10px; padding: 0.75rem 1rem;
  color: #86efac; font-size: 0.85rem;
}
.success-icon { width: 1rem; height: 1rem; flex-shrink: 0; }

.shake-enter-active { animation: shake 0.4s ease; }
.fade-enter-active { transition: opacity 0.3s ease; }
.fade-enter-from { opacity: 0; }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

.btn-submit {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff; border: none; border-radius: 12px;
  padding: 0.875rem; font-size: 1rem; font-weight: 700;
  cursor: pointer; transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  box-shadow: 0 8px 20px rgba(59,130,246,0.4); margin-top: 0.25rem;
}
.btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(59,130,246,0.5); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-label, .btn-loader { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.btn-icon { width: 1.1rem; height: 1.1rem; }
.spinner {
  width: 1rem; height: 1rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff; border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.register-footer { text-align: center; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.login-text { font-size: 0.875rem; color: rgba(255,255,255,0.45); }
.login-link { color: #60a5fa; font-weight: 600; text-decoration: none; }
.login-link:hover { text-decoration: underline; }
.back-link {
  display: inline-flex; align-items: center; gap: 0.375rem;
  color: rgba(255,255,255,0.35); font-size: 0.875rem;
  text-decoration: none; transition: color 0.2s; justify-content: center;
}
.back-link:hover { color: rgba(255,255,255,0.7); }
.back-icon { width: 0.875rem; height: 0.875rem; }
</style>