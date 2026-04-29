<template>
  <div class="profile-page">
    <!-- NAVBAR (Terhubung ke semua halaman) -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <router-link to="/" class="logo-link">
            <span class="logo-icon">💧</span>
            <span class="logo-text">PAKAR-AIR</span>
          </router-link>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Beranda</router-link>
          <router-link to="/edukasi" class="nav-link">Edukasi</router-link>
          <router-link to="/dashboard" class="nav-link">Analisis</router-link>
          <router-link to="/profile" class="nav-link active">Profil</router-link>
          <button @click="handleLogout" class="logout-btn" :disabled="authStore.isLoading">
            {{ authStore.isLoading ? 'Keluar...' : 'Keluar' }}
          </button>
        </div>
      </div>
    </nav>

    <!-- MAIN CONTENT -->
    <div class="profile-container">
      <div class="profile-card">
        <h1 class="page-title">👤 Profil Saya</h1>

        <!-- ========== UPDATE FOTO (PKD20TPA-29) ========== -->
        <div class="photo-section">
          <div class="avatar-wrapper">
            <img 
              :src="previewFoto || fotoProfil || defaultAvatar" 
              alt="Foto Profil"
              class="avatar"
            />
            <label class="upload-btn">
              <span>📷</span>
              <input 
                type="file" 
                @change="handleUploadFoto" 
                accept="image/jpeg,image/png,image/jpg"
                style="display: none"
              />
            </label>
          </div>
          <p class="photo-hint">Klik ikon kamera untuk ganti foto (max 2MB)</p>
        </div>

        <!-- ========== UPDATE NAMA & USERNAME (PKD20TPA-28) ========== -->
        <div class="form-section">
          <div class="form-group">
            <label>Nama Lengkap</label>
            <input 
              v-model="formData.nama" 
              type="text"
              placeholder="Masukkan nama lengkap"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>Username</label>
            <input 
              v-model="formData.username" 
              type="text"
              placeholder="Masukkan username"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input 
              v-model="formData.email" 
              type="email"
              placeholder="Masukkan email"
              class="form-input"
              disabled
            />
          </div>

          <div class="form-group">
            <label>Tanggal Bergabung</label>
            <input 
              :value="joinDate" 
              type="text"
              class="form-input"
              disabled
            />
          </div>

          <button 
            @click="updateProfil" 
            :disabled="loading"
            class="save-btn"
          >
            {{ loading ? 'Menyimpan...' : '💾 Simpan Perubahan' }}
          </button>
        </div>

        <!-- PESAN NOTIFIKASI -->
        <div v-if="message" :class="['message', messageType]">
          {{ message }}
        </div>
      </div>
    </div>

    <!-- FOOTER (Terhubung ke semua halaman) -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">
          <span class="logo-icon">💧</span>
          <span>PAKAR-AIR</span>
          <p>Pendeteksi Kualitas Air Berbasis AI</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Menu</h4>
            <router-link to="/">Beranda</router-link>
            <router-link to="/edukasi">Edukasi</router-link>
            <router-link to="/dashboard">Analisis</router-link>
            <router-link to="/profile">Profil</router-link>
          </div>
          <div class="footer-column">
            <h4>Edukasi</h4>
            <router-link to="/artikel">Parameter Air</router-link>
            <router-link to="/artikel2">Pencemaran Air</router-link>
            <router-link to="/artikel3">Teknologi Air</router-link>
          </div>
          <div class="footer-column">
            <h4>Akun</h4>
            <button @click="handleLogout" class="footer-logout-btn" :disabled="authStore.isLoading">
              {{ authStore.isLoading ? 'Keluar...' : 'Keluar' }}
            </button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 PAKAR-AIR. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// ========== STATE ==========
const loading = ref(false)
const message = ref('')
const messageType = ref('success')
const previewFoto = ref(null)
const fotoProfil = ref(null)
const defaultAvatar = 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&bold=true&size=120'

const formData = ref({
  nama: '',
  username: '',
  email: ''
})

const joinDate = ref('22 April 2026')

// ========== LOGOUT ==========
const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

// ========== LOAD DATA SAAT HALAMAN DIBUKA ==========
onMounted(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  loadUserData()
})

// ========== AMBIL DATA USER ==========
const loadUserData = () => {
  const user = authStore.currentUser
  if (user) {
    formData.value = {
      nama: user.full_name || user.nama || user.name || '',
      username: user.username || '',
      email: user.email || ''
    }
    fotoProfil.value = user.foto_profil || null
  }
}

// ========== UPDATE FOTO + VALIDASI ==========
const handleUploadFoto = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    showNotification('❌ Format file harus JPG, JPEG, atau PNG', 'error')
    return
  }
  
  if (file.size > 2 * 1024 * 1024) {
    showNotification('❌ Ukuran file maksimal 2MB', 'error')
    return
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    previewFoto.value = e.target.result
  }
  reader.readAsDataURL(file)
  
  uploadFotoKeServer(file)
}

const uploadFotoKeServer = async (file) => {
  loading.value = true
  // Simulasi upload (ganti dengan API real saat backend siap)
  setTimeout(() => {
    fotoProfil.value = previewFoto.value
    showNotification('✅ Foto profil berhasil diupdate!', 'success')
    loading.value = false
  }, 500)
}

// ========== UPDATE PROFIL + VALIDASI ==========
const updateProfil = async () => {
  if (!formData.value.nama || formData.value.nama.trim().length < 3) {
    showNotification('❌ Nama harus diisi minimal 3 karakter', 'error')
    return
  }
  
  if (!formData.value.username || formData.value.username.trim().length < 3) {
    showNotification('❌ Username harus diisi minimal 3 karakter', 'error')
    return
  }
  
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  if (!usernameRegex.test(formData.value.username)) {
    showNotification('❌ Username hanya boleh huruf, angka, dan underscore (_)', 'error')
    return
  }
  
  loading.value = true
  // Simulasi simpan (ganti dengan API real saat backend siap)
  setTimeout(() => {
    showNotification('✅ Profil berhasil diperbarui!', 'success')
    loading.value = false
  }, 500)
}

const showNotification = (msg, type) => {
  message.value = msg
  messageType.value = type
  setTimeout(() => { message.value = '' }, 3000)
}
</script>

<style scoped src="@/assets/styles/pages/profile.css"></style>