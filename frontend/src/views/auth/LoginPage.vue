<template>
  <div class="login-page">
    <div class="login-card">

      <!-- Header -->
      <div class="login-header">
        <div class="logo-icon">
          <span class="material-icons">water_drop</span>
        </div>
        <h1 class="title">Masuk ke PAKAR-AIR</h1>
        <p class="subtitle">
          Selamat datang kembali! Silakan masuk ke akun Anda
        </p>
      </div>

      <!-- Form -->
      <form class="login-form" @submit.prevent="handleLogin">

        <!-- Username -->
        <div class="form-group">
          <label class="form-label">Username</label>
          <div class="input-wrapper">
            <span class="material-icons input-icon">mail</span>
            <input
              v-model="form.username"
              type="text"
              placeholder="Username"
              class="input"
              :class="{ 'input-error': errors.username }"
            />
          </div>
          <span v-if="errors.username" class="error-text">
            {{ errors.username }}
          </span>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="input-wrapper">
            <span class="material-icons input-icon">lock</span>
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              class="input"
              :class="{ 'input-error': errors.password }"
            />
          </div>
          <span v-if="errors.password" class="error-text">
            {{ errors.password }}
          </span>
        </div>

        <!-- Global Error -->
        <div v-if="errors.global" class="error-box">
          {{ errors.global }}
        </div>

        <!-- Button -->
        <button type="submit" class="btn-login" :disabled="isLoading">
          <span v-if="isLoading">Memproses...</span>
          <span v-else>Masuk</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="login-footer">
        <p>
          Belum punya akun?
          <RouterLink to="/register">Daftar di sini</RouterLink>
        </p>
        <RouterLink to="/" class="back-link">
          Kembali ke beranda
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: '',
  global: ''
})

function validate() {
  errors.username = ''
  errors.password = ''
  errors.global = ''

  let valid = true

  if (!form.username) {
    errors.username = 'Username wajib diisi'
    valid = false
  }

  if (!form.password) {
    errors.password = 'Password wajib diisi'
    valid = false
  }

  return valid
}

function fakeLoginAPI(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        resolve({ success: true })
      } else {
        reject({ message: 'Username atau password tidak valid' })
      }
    }, 800)
  })
}

async function handleLogin() {
  if (!validate()) return

  isLoading.value = true
  errors.global = ''

  try {
    const res = await fakeLoginAPI(form.username, form.password)
    if (res.success) {
      router.push('/dashboard')
    }
  } catch (err) {
    errors.global = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* ===============================
   PAGE
=============================== */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #071952, #1A1953);
  padding: 16px;
}

/* ===============================
   CARD
=============================== */
.login-card {
  width: 100%;
  max-width: 380px;
  background: #F1F1F1;
  border-radius: 16px;
  padding: 30px 26px 24px;

  box-shadow:
    0 20px 40px rgba(0,0,0,0.2);

  text-align: center;
}

/* ===============================
   HEADER
=============================== */
.login-header {
  margin-bottom: 20px;
}

.logo-icon {
  width: 54px;
  height: 54px;
  background: #1A1953;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto 16px;
  color: white;
}

.material-icons {
  font-size: 26px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #071952;
}

.subtitle {
  font-size: 13px;
  color: #4b5563;
}

/* ===============================
   FORM
=============================== */
.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  text-align: left;
  margin-top: 16px;
}

.form-label {
  font-size: 13px;
  margin-bottom: 6px;
  color: #374151;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #9ca3af;
}

.input {
  width: 100%;
  padding: 12px 12px 12px 38px;

  border: none;
  border-radius: 10px;

  background: #ffffff;
  font-size: 14px;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(26,25,83,0.15);
}

.input-error {
  background: #fdeeee;
}

/* ===============================
   ERROR
=============================== */
.error-text {
  font-size: 12px;
  color: #b42318;
}

.error-box {
  margin-top: 12px;
  padding: 10px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #b50000;
  color: #7a271a;
  font-size: 13px;
}

/* ===============================
   BUTTON
=============================== */
.btn-login {
  width: 100%;
  margin-top: 20px;
  padding: 12px;

  background: #1A1953;
  color: white;

  border: none;
  border-radius: 10px;

  font-weight: 600;
}

.btn-login:hover {
  background: #071952;
}

.btn-login:disabled {
  opacity: 0.7;
}

/* ===============================
   FOOTER
=============================== */
.login-footer {
  margin-top: 20px;
  font-size: 13px;
}

.login-footer p {
  margin-bottom: 8px;
  color: #6b7280;
}

.login-footer a {
  color: #1A1953;
  font-weight: 500;
}

.back-link {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #6b7280;
}
</style>