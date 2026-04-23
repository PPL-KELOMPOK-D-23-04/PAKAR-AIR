<template>
  <div class="auth-container">
    <h2>Daftar Akun</h2>
    <form @submit.prevent="handleRegister">
      <input type="text" placeholder="Nama Lengkap" v-model="nama">
      <input type="text" placeholder="Username" v-model="username">
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit">Daftar</button>
    </form>
    <p>Sudah punya akun? <router-link to="/login">Masuk</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nama = ref('')
const username = ref('')
const password = ref('')

const handleRegister = () => {
  localStorage.setItem('token', 'dummy-token')
  localStorage.setItem('user', JSON.stringify({ nama: nama.value, username: username.value }))
  router.push('/dashboard')
}
</script>