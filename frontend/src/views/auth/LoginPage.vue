<template>
  <div class="login-page">

    <!-- Ambient Background Layers -->
    <div class="bg-grid"></div>
    <div class="bg-radial bg-radial--1"></div>
    <div class="bg-radial bg-radial--2"></div>
    <div class="bg-noise"></div>

    <!-- Floating Orbs -->
    <div class="orb orb--1"></div>
    <div class="orb orb--2"></div>
    <div class="orb orb--3"></div>

    <!-- Main Card -->
    <div class="login-shell">

      <!-- Side Brand Panel -->
      <div class="brand-panel">
        <div class="brand-inner">
          <div class="brand-logo">
            <span class="material-icons">water_drop</span>
          </div>
          <h2 class="brand-name">PAKAR-AIR</h2>
          <p class="brand-tagline">Platform Analisis Kualitas Air Berbasis Kecerdasan Buatan</p>

          <div class="brand-stats">
            <div class="stat-item">
              <span class="stat-value">99.8%</span>
              <span class="stat-label">Akurasi Deteksi</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">24/7</span>
              <span class="stat-label">Monitoring Real-time</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">15+</span>
              <span class="stat-label">Parameter Air</span>
            </div>
          </div>

          <div class="brand-badge">
            <span class="badge-dot"></span>
            <span>Sistem Aktif &amp; Berjalan</span>
          </div>
        </div>
      </div>

      <!-- Form Panel -->
      <div class="form-panel">
        <div class="form-inner">

          <!-- Header -->
          <div class="form-header">
            <div class="form-logo-sm">
              <span class="material-icons">water_drop</span>
            </div>
            <h1 class="form-title">Masuk ke Akun</h1>
            <p class="form-subtitle">Selamat datang kembali di PAKAR-AIR</p>
          </div>

          <!-- Divider -->
          <div class="form-divider">
            <span>Login dengan Email</span>
          </div>

          <!-- Form -->
          <form class="login-form" @submit.prevent="handleLogin" novalidate>

            <!-- Email -->
            <div class="field-group" :class="{ 'field-group--error': errors.email }">
              <label class="field-label" for="email">Email</label>
              <div class="field-control">
                <span class="material-icons field-icon">mail_outline</span>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="contoh@email.com"
                  class="field-input"
                  autocomplete="email"
                  @input="errors.email = ''"
                />
                <Transition name="check-fade">
                  <span v-if="form.email && !errors.email" class="field-check material-icons">check_circle</span>
                </Transition>
              </div>
              <Transition name="err-slide">
                <span v-if="errors.email" class="field-error-msg">
                  <span class="material-icons">error_outline</span>{{ errors.email }}
                </span>
              </Transition>
            </div>

            <!-- Password -->
            <div class="field-group" :class="{ 'field-group--error': errors.password }">
              <div class="field-label-row">
                <label class="field-label" for="password">Password</label>
              </div>
              <div class="field-control">
                <span class="material-icons field-icon">lock_outline</span>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPw ? 'text' : 'password'"
                  placeholder="Masukkan password"
                  class="field-input field-input--pw"
                  autocomplete="current-password"
                  @input="errors.password = ''"
                />
                <button type="button" class="pw-toggle" @click="showPw = !showPw" :aria-label="showPw ? 'Sembunyikan password' : 'Tampilkan password'">
                  <span class="material-icons">{{ showPw ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
              <Transition name="err-slide">
                <span v-if="errors.password" class="field-error-msg">
                  <span class="material-icons">error_outline</span>{{ errors.password }}
                </span>
              </Transition>
            </div>

            <!-- Global Error -->
            <Transition name="err-slide">
              <div v-if="errors.global" class="global-error" role="alert">
                <span class="material-icons">warning_amber</span>
                <span>{{ errors.global }}</span>
              </div>
            </Transition>

            <!-- Submit Button -->
            <button type="submit" class="btn-submit" :disabled="isLoading">
              <span v-if="isLoading" class="btn-loading">
                <span class="spinner"></span>
                <span>Memproses...</span>
              </span>
              <span v-else class="btn-label">
                <span>Masuk</span>
                <span class="material-icons btn-arrow">arrow_forward</span>
              </span>
              <span class="btn-shine"></span>
            </button>

          </form>

          <!-- Footer -->
          <div class="form-footer">
            <p class="footer-text">
              Belum punya akun?
              <RouterLink to="/register" class="footer-link">Daftar sekarang</RouterLink>
            </p>
            <RouterLink to="/" class="back-link">
              <span class="material-icons">arrow_back</span>
              <span>Kembali ke beranda</span>
            </RouterLink>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const showPw = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  global: ''
})

function validate() {
  errors.email = ''
  errors.password = ''
  errors.global = ''
  let valid = true

  if (!form.email) {
    errors.email = 'Email wajib diisi'
    valid = false
  }
  if (!form.password) {
    errors.password = 'Password wajib diisi'
    valid = false
  }
  return valid
}

async function handleLogin() {
  if (!validate()) return

  isLoading.value = true
  errors.global = ''

  const res = await authStore.login(form.email, form.password)
  isLoading.value = false

  if (res.success) {
    if (res.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  } else {
    errors.global = res.message || 'Gagal login. Cek kembali email/password.'
  }
}
</script>

<style scoped>
/* ============================================================
   PAGE — Deep Navy Scientific Aesthetic
   Warna berdasarkan main.css
   ============================================================ */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #060e24;
  position: relative;
  overflow: hidden;
  padding: 20px;
  font-family: var(--font-sans);
}

/* Grid Pattern */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(37, 99, 235, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px);
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
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(30, 64, 175, 0.22) 0%, transparent 70%);
  top: -200px;
  left: -200px;
}
.bg-radial--2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(7, 25, 82, 0.35) 0%, transparent 70%);
  bottom: -150px;
  right: -100px;
}

/* Noise Texture Overlay */
.bg-noise {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* Floating Orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: orb-float 12s ease-in-out infinite;
}
.orb--1 {
  width: 280px; height: 280px;
  background: radial-gradient(circle, rgba(26, 25, 83, 0.55) 0%, transparent 70%);
  top: 10%; left: 5%;
  animation-delay: 0s;
}
.orb--2 {
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
  bottom: 15%; right: 10%;
  animation-delay: 4s;
}
.orb--3 {
  width: 150px; height: 150px;
  background: radial-gradient(circle, rgba(30, 64, 175, 0.12) 0%, transparent 70%);
  top: 60%; left: 30%;
  animation-delay: 8s;
}

@keyframes orb-float {
  0%, 100% { transform: translateY(0) scale(1); }
  33% { transform: translateY(-20px) scale(1.04); }
  66% { transform: translateY(12px) scale(0.97); }
}

/* ============================================================
   SHELL — Two-Panel Layout
   ============================================================ */
.login-shell {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  max-width: 900px;
  min-height: 580px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(37, 99, 235, 0.15),
    0 40px 80px rgba(0, 0, 0, 0.55),
    0 0 60px rgba(7, 25, 82, 0.4);
  animation: shell-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes shell-enter {
  from { opacity: 0; transform: translateY(32px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ============================================================
   BRAND PANEL — Left Side
   ============================================================ */
.brand-panel {
  flex: 0 0 340px;
  background: linear-gradient(160deg, #0f1f5c 0%, #071952 40%, #060e2a 100%);
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(37, 99, 235, 0.15);
}

/* Brand Panel Decorative Lines */
.brand-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #2563eb, #1e40af, transparent);
}

.brand-panel::after {
  content: '';
  position: absolute;
  bottom: -60px;
  right: -60px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  border: 1px solid rgba(37, 99, 235, 0.08);
  background: radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
}

.brand-inner { position: relative; z-index: 1; }

.brand-logo {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
}
.brand-logo .material-icons {
  font-size: 28px;
  color: #ffffff;
}

.brand-name {
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.brand-tagline {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(148, 163, 184, 0.85);
  margin-bottom: 36px;
  max-width: 220px;
}

/* Stats */
.brand-stats {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(37, 99, 235, 0.07);
  border: 1px solid rgba(37, 99, 235, 0.12);
  border-radius: 14px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: #60a5fa;
  letter-spacing: -0.5px;
}
.stat-label {
  font-size: 10px;
  color: rgba(148, 163, 184, 0.6);
  text-align: center;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(37, 99, 235, 0.2);
  flex-shrink: 0;
}

/* Active Badge */
.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 100px;
  font-size: 12px;
  color: rgba(167, 243, 208, 0.9);
}
.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); }
  50%       { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.08); }
}

/* ============================================================
   FORM PANEL — Right Side
   ============================================================ */
.form-panel {
  flex: 1;
  background: #0b1630;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 44px;
}

.form-inner {
  width: 100%;
  max-width: 360px;
}

.form-header { margin-bottom: 28px; text-align: center; }

.form-logo-sm {
  width: 42px;
  height: 42px;
  background: rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.form-logo-sm .material-icons { font-size: 20px; color: #60a5fa; }

.form-title {
  font-size: 22px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.3px;
  margin-bottom: 6px;
}
.form-subtitle {
  font-size: 13px;
  color: #64748b;
}

/* Divider */
.form-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.form-divider::before,
.form-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(37, 99, 235, 0.1);
}
.form-divider span {
  font-size: 11px;
  color: #475569;
  white-space: nowrap;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* ============================================================
   FORM FIELDS
   ============================================================ */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.field-control {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 14px;
  font-size: 18px;
  color: #334155;
  pointer-events: none;
  transition: color 0.2s;
}

.field-input {
  width: 100%;
  height: 46px;
  padding: 0 44px 0 44px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(37, 99, 235, 0.12);
  border-radius: 12px;
  font-size: 14px;
  color: #e2e8f0;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
}
.field-input::placeholder { color: #334155; }
.field-input:focus {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.06);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1), 0 0 20px rgba(37, 99, 235, 0.05);
}
.field-input:focus + .field-check { opacity: 1; }
.field-input:focus ~ .field-icon,
.field-control:focus-within .field-icon { color: #3b82f6; }

.field-input--pw { padding-right: 48px; }

/* Valid Check */
.field-check {
  position: absolute;
  right: 14px;
  font-size: 16px;
  color: #10b981;
  pointer-events: none;
}

/* Error State */
.field-group--error .field-input {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.04);
}
.field-error-msg {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #f87171;
}
.field-error-msg .material-icons { font-size: 13px; }

/* Password Toggle */
.pw-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #334155;
  transition: color 0.2s;
  border-radius: 6px;
}
.pw-toggle:hover { color: #94a3b8; }
.pw-toggle .material-icons { font-size: 18px; }

/* Global Error */
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

/* ============================================================
   SUBMIT BUTTON
   ============================================================ */
.btn-submit {
  position: relative;
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
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

/* Shine effect */
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
.btn-arrow { font-size: 18px; transition: transform 0.2s; }
.btn-submit:hover .btn-arrow { transform: translateX(3px); }

/* Spinner */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ============================================================
   FOOTER
   ============================================================ */
.form-footer {
  margin-top: 28px;
  text-align: center;
}
.footer-text {
  font-size: 13px;
  color: #475569;
  margin-bottom: 14px;
}
.footer-link {
  color: #60a5fa;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-link:hover { color: #93c5fd; }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
.err-slide-enter-active { transition: all 0.2s ease; }
.err-slide-enter-from  { opacity: 0; transform: translateY(-4px); }

.check-fade-enter-active { transition: opacity 0.3s ease; }
.check-fade-enter-from   { opacity: 0; }

/* ============================================================
   RESPONSIVE — Hide brand panel on small screens
   ============================================================ */
@media (max-width: 680px) {
  .brand-panel { display: none; }
  .login-shell { max-width: 420px; }
  .form-panel { padding: 36px 28px; }
}
</style>