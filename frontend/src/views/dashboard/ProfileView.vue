<template>
  <div class="profile-page">
    <div class="profile-card">
      <h1>Profil Saya</h1>

      <div class="profile-form">
        <label>Nama</label>
        <input type="text" placeholder="Masukkan nama" />

        <label>Username</label>
        <input type="text" placeholder="Masukkan username" />

        <label>Password Baru</label>
        <input type="password" placeholder="Masukkan password baru" />

        <button>Simpan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

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