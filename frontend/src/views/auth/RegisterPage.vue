<template>
  <div class="register-page">

    <!-- Ambient Background -->
    <div class="bg-grid"></div>
    <div class="bg-radial bg-radial--1"></div>
    <div class="bg-radial bg-radial--2"></div>
    <div class="bg-noise"></div>
    <div class="orb orb--1"></div>
    <div class="orb orb--2"></div>

    <!-- Card -->
    <div class="register-card">

      <!-- Top Accent Bar -->
      <div class="card-accent-bar">
        <div class="card-accent-bar__inner"></div>
      </div>

      <!-- Header -->
      <div class="reg-header">
        <RouterLink to="/" class="reg-logo-link">
          <div class="reg-logo">
            <span class="material-icons">water_drop</span>
          </div>
          <span class="reg-brand">PAKAR-AIR</span>
        </RouterLink>
        <h1 class="reg-title">Buat Akun Baru</h1>
        <p class="reg-subtitle">Daftar untuk mulai menganalisis kualitas air</p>
      </div>

      <!-- Step Indicator (visual only) -->
      <div class="step-track">
        <div class="step-item step-item--active">
          <span class="step-dot"></span>
          <span class="step-label">Info Akun</span>
        </div>
        <div class="step-line"></div>
        <div class="step-item">
          <span class="step-dot step-dot--inactive"></span>
          <span class="step-label" style="color: #334155;">Verifikasi</span>
        </div>
        <div class="step-line"></div>
        <div class="step-item">
          <span class="step-dot step-dot--inactive"></span>
          <span class="step-label" style="color: #334155;">Selesai</span>
        </div>
      </div>

      <!-- Form -->
      <form class="reg-form" @submit.prevent="handleRegister" novalidate>

        <!-- Row: Full Name + Username -->
        <div class="field-row">

          <!-- Full Name -->
          <div class="field-group" :class="{ 'field-group--error': fieldErrors.full_name }">
            <label class="field-label" for="full_name">
              <span class="material-icons label-icon">person_outline</span>
              Nama Lengkap
            </label>
            <div class="field-ctrl">
              <input
                id="full_name"
                v-model="form.full_name"
                type="text"
                class="field-input"
                placeholder="Nama lengkap"
                :disabled="isLoading"
                @input="fieldErrors.full_name = ''"
              />
              <Transition name="check-fade">
                <span v-if="form.full_name && !fieldErrors.full_name" class="input-check material-icons">check_circle</span>
              </Transition>
            </div>
            <Transition name="err-slide">
              <span v-if="fieldErrors.full_name" class="err-msg">
                <span class="material-icons">error_outline</span>{{ fieldErrors.full_name }}
              </span>
            </Transition>
          </div>

          <!-- Username -->
          <div class="field-group" :class="{ 'field-group--error': fieldErrors.username }">
            <label class="field-label" for="username">
              <span class="material-icons label-icon">alternate_email</span>
              Username
            </label>
            <div class="field-ctrl">
              <input
                id="username"
                v-model="form.username"
                type="text"
                class="field-input"
                placeholder="username_anda"
                :disabled="isLoading"
                @input="fieldErrors.username = ''"
              />
              <Transition name="check-fade">
                <span v-if="form.username.length >= 3 && !fieldErrors.username" class="input-check material-icons">check_circle</span>
              </Transition>
            </div>
            <Transition name="err-slide">
              <span v-if="fieldErrors.username" class="err-msg">
                <span class="material-icons">error_outline</span>{{ fieldErrors.username }}
              </span>
            </Transition>
          </div>

        </div>

        <!-- Email -->
        <div class="field-group" :class="{ 'field-group--error': fieldErrors.email }">
          <label class="field-label" for="email">
            <span class="material-icons label-icon">mail_outline</span>
            Email
          </label>
          <div class="field-ctrl">
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="field-input field-input--wide"
              placeholder="contoh@email.com"
              autocomplete="email"
              :disabled="isLoading"
              @input="fieldErrors.email = ''"
            />
            <Transition name="check-fade">
              <span v-if="form.email && !fieldErrors.email" class="input-check material-icons">check_circle</span>
            </Transition>
          </div>
          <Transition name="err-slide">
            <span v-if="fieldErrors.email" class="err-msg">
              <span class="material-icons">error_outline</span>{{ fieldErrors.email }}
            </span>
          </Transition>
        </div>

        <!-- Password -->
        <div class="field-group" :class="{ 'field-group--error': fieldErrors.password }">
          <label class="field-label" for="password">
            <span class="material-icons label-icon">lock_outline</span>
            Password
          </label>
          <div class="field-ctrl">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="field-input field-input--wide field-input--pw"
              placeholder="Minimal 6 karakter"
              :disabled="isLoading"
              @input="fieldErrors.password = ''"
            />
            <button type="button" class="pw-toggle" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Sembunyikan' : 'Tampilkan'">
              <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>

          <!-- Password Strength -->
          <div v-if="form.password" class="pw-strength">
            <div class="pw-bars">
              <div class="pw-bar" :class="{ 'pw-bar--filled': pwScore >= 1, 'pw-bar--weak': pwScore === 1, 'pw-bar--medium': pwScore === 2, 'pw-bar--strong': pwScore >= 3 }"></div>
              <div class="pw-bar" :class="{ 'pw-bar--filled': pwScore >= 2, 'pw-bar--medium': pwScore === 2, 'pw-bar--strong': pwScore >= 3 }"></div>
              <div class="pw-bar" :class="{ 'pw-bar--filled': pwScore >= 3, 'pw-bar--strong': pwScore >= 3 }"></div>
              <div class="pw-bar" :class="{ 'pw-bar--filled': pwScore >= 4, 'pw-bar--strong': pwScore >= 4 }"></div>
            </div>
            <span class="pw-label" :class="pwLabelClass">{{ pwLabelText }}</span>
          </div>

          <Transition name="err-slide">
            <span v-if="fieldErrors.password" class="err-msg">
              <span class="material-icons">error_outline</span>{{ fieldErrors.password }}
            </span>
          </Transition>
        </div>

        <!-- Global Error -->
        <Transition name="err-slide">
          <div v-if="errorMessage" class="global-error" role="alert">
            <span class="material-icons">warning_amber</span>
            <span>{{ errorMessage }}</span>
          </div>
        </Transition>

        <!-- Global Success -->
        <Transition name="err-slide">
          <div v-if="successMessage" class="global-success" role="status">
            <span class="material-icons">check_circle</span>
            <span>{{ successMessage }}</span>
          </div>
        </Transition>

        <!-- Submit -->
        <button type="submit" class="btn-submit" :disabled="isLoading">
          <span v-if="isLoading" class="btn-loading">
            <span class="spinner"></span>
            <span>Memproses...</span>
          </span>
          <span v-else class="btn-label">
            <span class="material-icons">person_add</span>
            <span>Daftar Sekarang</span>
            <span class="material-icons btn-arrow">arrow_forward</span>
          </span>
          <span class="btn-shine"></span>
        </button>

      </form>

      <!-- Footer -->
      <div class="reg-footer">
        <p class="footer-text">
          Sudah punya akun?
          <RouterLink to="/login" class="footer-link">Masuk di sini</RouterLink>
        </p>
        <RouterLink to="/" class="back-link">
          <span class="material-icons">arrow_back</span>
          <span>Kembali ke Beranda</span>
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

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

// Password strength score (0-4)
const pwScore = computed(() => {
  const pw = form.password
  if (!pw) return 0
  let score = 0
  if (pw.length >= 6)  score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw) || /[0-9]/.test(pw)) score++
  return score
})
const pwLabelText = computed(() => {
  const labels = ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat']
  return labels[pwScore.value] || ''
})
const pwLabelClass = computed(() => {
  const classes = ['', 'pw-label--weak', 'pw-label--medium', 'pw-label--strong', 'pw-label--strong']
  return classes[pwScore.value] || ''
})

function validate() {
  let valid = true
  Object.keys(fieldErrors).forEach(k => fieldErrors[k] = '')

  if (!form.full_name.trim()) { fieldErrors.full_name = 'Nama lengkap tidak boleh kosong.'; valid = false }
  if (!form.username.trim()) { fieldErrors.username = 'Username tidak boleh kosong.'; valid = false }
  else if (form.username.length < 3) { fieldErrors.username = 'Username minimal 3 karakter.'; valid = false }
  else if (form.username.length > 50) { fieldErrors.username = 'Username maksimal 50 karakter.'; valid = false }
  if (!form.email) { fieldErrors.email = 'Email tidak boleh kosong.'; valid = false }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { fieldErrors.email = 'Format email tidak valid.'; valid = false }
  if (!form.password) { fieldErrors.password = 'Password tidak boleh kosong.'; valid = false }
  else if (form.password.length < 6) { fieldErrors.password = 'Password minimal 6 karakter.'; valid = false }

  return valid
}

async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''
  if (!validate()) return

  isLoading.value = true
  try {
    await axios.post(`${API_BASE}/api/auth/register`, {
      email: form.email,
      password: form.password,
      full_name: form.full_name,
      username: form.username,
    })
    successMessage.value = 'Akun berhasil dibuat! Mengarahkan ke halaman login...'
    setTimeout(() => { router.push('/login') }, 2000)
  } catch (err) {
    errorMessage.value =
      err.response?.data?.detail ||
      err.response?.data?.message ||
      'Gagal mendaftar. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* ============================================================
   PAGE BASE
   ============================================================ */
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #060e24;
  position: relative;
  overflow: hidden;
  padding: 24px 16px;
  font-family: var(--font-sans);
}

/* Grid Pattern */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(37, 99, 235, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.035) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

/* Radial Glows */
.bg-radial {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
}
.bg-radial--1 {
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(30, 64, 175, 0.2) 0%, transparent 70%);
  top: -250px; left: -200px;
}
.bg-radial--2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(7, 25, 82, 0.3) 0%, transparent 70%);
  bottom: -100px; right: -100px;
}

/* Noise */
.bg-noise {
  position: absolute;
  inset: 0; opacity: 0.025;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* Orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: orb-float 10s ease-in-out infinite;
}
.orb--1 {
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(26, 25, 83, 0.5) 0%, transparent 70%);
  top: 5%; right: 5%;
  animation-delay: 0s;
}
.orb--2 {
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%);
  bottom: 10%; left: 10%;
  animation-delay: 5s;
}
@keyframes orb-float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.04); }
}

/* ============================================================
   CARD
   ============================================================ */
.register-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 560px;
  background: #0b1630;
  border: 1px solid rgba(37, 99, 235, 0.12);
  border-radius: 24px;
  padding: 0 0 36px;
  box-shadow:
    0 0 0 1px rgba(37, 99, 235, 0.08),
    0 40px 80px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(7, 25, 82, 0.3);
  animation: card-enter 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  overflow: hidden;
}
@keyframes card-enter {
  from { opacity: 0; transform: translateY(36px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Top Accent Bar */
.card-accent-bar {
  height: 3px;
  background: rgba(37, 99, 235, 0.08);
  margin-bottom: 0;
}
.card-accent-bar__inner {
  height: 100%;
  width: 60%;
  background: linear-gradient(90deg, #1e40af, #2563eb, #60a5fa, transparent);
  border-radius: 0 2px 2px 0;
}

/* ============================================================
   HEADER
   ============================================================ */
.reg-header {
  text-align: center;
  padding: 36px 36px 20px;
}

.reg-logo-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-bottom: 20px;
}

.reg-logo {
  width: 44px; height: 44px;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(255,255,255,0.08) inset;
}
.reg-logo .material-icons { font-size: 24px; color: #fff; }

.reg-brand {
  font-size: 18px;
  font-weight: 800;
  color: #f1f5f9;
  letter-spacing: 0.5px;
}

.reg-title {
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.3px;
  margin-bottom: 6px;
}
.reg-subtitle { font-size: 13px; color: #64748b; }

/* ============================================================
   STEP INDICATOR
   ============================================================ */
.step-track {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 36px 24px;
}
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.step-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  display: block;
}
.step-dot--inactive {
  background: #1e293b;
  box-shadow: none;
  border: 1px solid #334155;
}
.step-label {
  font-size: 10px;
  font-weight: 600;
  color: #60a5fa;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
.step-line {
  flex: 1;
  height: 1px;
  background: rgba(37, 99, 235, 0.12);
  max-width: 64px;
  margin-bottom: 18px;
}

/* ============================================================
   FORM
   ============================================================ */
.reg-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 36px;
}

/* Two-column row */
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

/* Field Group */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Label */
.field-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.label-icon { font-size: 13px; opacity: 0.7; }

/* Field Control Wrapper */
.field-ctrl {
  position: relative;
  display: flex;
  align-items: center;
}

/* Input */
.field-input {
  width: 100%;
  height: 44px;
  padding: 0 40px 0 14px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(37, 99, 235, 0.1);
  border-radius: 8px;
  font-size: 14px;
  color: #e2e8f0;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
}
.field-input::placeholder { color: #334155; font-size: 13px; }
.field-input:focus {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.06);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.field-input:disabled { opacity: 0.5; cursor: not-allowed; }

/* Fix Browser Autofill White Background Issue */
.field-input:-webkit-autofill,
.field-input:-webkit-autofill:hover, 
.field-input:-webkit-autofill:focus, 
.field-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 50px #0f172a inset !important;
  -webkit-text-fill-color: #e2e8f0 !important;
  transition: background-color 5000s ease-in-out 0s;
  caret-color: #e2e8f0;
}

.field-input--wide { width: 100%; }
.field-input--pw  { padding-right: 48px; }

/* Error state */
.field-group--error .field-input {
  border-color: rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.04);
}

/* Valid check icon */
.input-check {
  position: absolute;
  right: 12px;
  font-size: 15px;
  color: #10b981;
  pointer-events: none;
}

/* Password toggle */
.pw-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #334155;
  border-radius: 6px;
  transition: color 0.2s;
}
.pw-toggle:hover { color: #94a3b8; }
.pw-toggle .material-icons { font-size: 18px; }

/* Error message */
.err-msg {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #f87171;
}
.err-msg .material-icons { font-size: 12px; }

/* ============================================================
   PASSWORD STRENGTH
   ============================================================ */
.pw-strength {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 2px;
}
.pw-bars {
  display: flex;
  gap: 4px;
  flex: 1;
}
.pw-bar {
  height: 3px;
  flex: 1;
  border-radius: 2px;
  background: rgba(37, 99, 235, 0.1);
  transition: background 0.3s;
}
.pw-bar--filled.pw-bar--weak   { background: #ef4444; }
.pw-bar--filled.pw-bar--medium { background: #f59e0b; }
.pw-bar--filled.pw-bar--strong { background: #10b981; }

.pw-label { font-size: 11px; font-weight: 600; white-space: nowrap; }
.pw-label--weak   { color: #ef4444; }
.pw-label--medium { color: #f59e0b; }
.pw-label--strong { color: #10b981; }

/* ============================================================
   GLOBAL ALERTS
   ============================================================ */
.global-error {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  color: #fca5a5;
  font-size: 13px;
}
.global-error .material-icons { font-size: 16px; color: #ef4444; flex-shrink: 0; }

.global-success {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  color: #a7f3d0;
  font-size: 13px;
}
.global-success .material-icons { font-size: 16px; color: #10b981; flex-shrink: 0; }

/* ============================================================
   SUBMIT BUTTON
   ============================================================ */
.btn-submit {
  position: relative;
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(255,255,255,0.06) inset;
  margin-top: 4px;
}
.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(37, 99, 235, 0.45), 0 0 0 1px rgba(255,255,255,0.08) inset;
}
.btn-submit:active:not(:disabled) { transform: translateY(0); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-shine {
  position: absolute;
  top: 0; left: -120%;
  width: 80%; height: 100%;
  background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.12) 50%, transparent 80%);
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}
.btn-submit:hover .btn-shine { left: 160%; }

.btn-label, .btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-label .material-icons { font-size: 18px; }
.btn-arrow { transition: transform 0.2s; }
.btn-submit:hover .btn-arrow { transform: translateX(3px); }

.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ============================================================
   FOOTER
   ============================================================ */
.reg-footer {
  text-align: center;
  padding: 24px 36px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer-text { font-size: 13px; color: #475569; }
.footer-link { color: #60a5fa; font-weight: 600; text-decoration: none; }
.footer-link:hover { color: #93c5fd; }

.back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  color: #334155;
  text-decoration: none;
  transition: color 0.2s;
}
.back-link:hover { color: #64748b; }
.back-link .material-icons { font-size: 14px; }

/* ============================================================
   TRANSITIONS
   ============================================================ */
.err-slide-enter-active  { transition: all 0.2s ease; }
.err-slide-enter-from    { opacity: 0; transform: translateY(-4px); }
.check-fade-enter-active { transition: opacity 0.3s ease; }
.check-fade-enter-from   { opacity: 0; }

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 560px) {
  .register-card { border-radius: 16px; }
  .reg-header, .reg-form, .reg-footer { padding-left: 24px; padding-right: 24px; }
  .field-row { grid-template-columns: 1fr; }
  .step-track { display: none; }
}
</style>