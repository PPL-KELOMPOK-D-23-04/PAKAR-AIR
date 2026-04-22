<template>
  <div class="profile-container">
    <h1 class="title">Profil Saya</h1>

    <!-- ========== BAGIAN FOTO PROFIL (PKD20TPA-29) ========== -->
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

    <!-- ========== BAGIAN FORM EDIT NAMA & USERNAME (PKD20TPA-28) ========== -->
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

      <!-- ========== BUTTON SIMPAN ========== -->
      <button 
        @click="updateProfil" 
        :disabled="loading"
        class="save-btn"
      >
        {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
      </button>
    </div>

    <!-- ========== PESAN HASIL ========== -->
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// ========== STATE ==========
const loading = ref(false)
const message = ref('')
const messageType = ref('success')
const previewFoto = ref(null)
const fotoProfil = ref(null)
const defaultAvatar = 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&bold=true'

const formData = ref({
  nama: '',
  username: '',
  email: ''
})

// ========== AMBIL DATA USER SAAT LOAD (PKD20TPA-27) ==========
onMounted(async () => {
  await loadUserData()
})

const loadUserData = async () => {
  try {
    // Ambil dari localStorage dulu (sementara)
    const savedUser = localStorage.getItem('user_data')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      formData.value = {
        nama: user.nama || '',
        username: user.username || '',
        email: user.email || 'user@example.com'
      }
      fotoProfil.value = user.foto_profil || null
    }
    
    // Nanti ganti dengan panggilan API real:
    // const response = await fetch('http://localhost:8000/api/user/profile', {
    //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    // })
    // const data = await response.json()
    // formData.value = data
  } catch (error) {
    console.error('Gagal load data:', error)
  }
}

// ========== UPDATE FOTO (PKD20TPA-29) + VALIDASI (PKD20TPA-30) ==========
const handleUploadFoto = (event) => {
  const file = event.target.files[0]
  
  // VALIDASI: file harus ada
  if (!file) return
  
  // VALIDASI: tipe file (hanya gambar)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    message.value = '❌ Format file harus JPG, JPEG, atau PNG'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  // VALIDASI: ukuran file max 2MB
  if (file.size > 2 * 1024 * 1024) {
    message.value = '❌ Ukuran file maksimal 2MB'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  // Preview foto sebelum upload
  const reader = new FileReader()
  reader.onload = (e) => {
    previewFoto.value = e.target.result
  }
  reader.readAsDataURL(file)
  
  // Upload ke server (PKD20TPA-31)
  uploadFotoKeServer(file)
}

const uploadFotoKeServer = async (file) => {
  loading.value = true
  
  // Simulasi upload (pakai FormData)
  const formDataUpload = new FormData()
  formDataUpload.append('foto_profil', file)
  
  try {
    // === INTEGRASI API (PKD20TPA-31) ===
    // Nanti ganti dengan endpoint real:
    // const response = await fetch('http://localhost:8000/api/user/upload-photo', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    //   body: formDataUpload
    // })
    // const result = await response.json()
    
    // Simulasi berhasil
    setTimeout(() => {
      fotoProfil.value = previewFoto.value
      message.value = '✅ Foto profil berhasil diupdate!'
      messageType.value = 'success'
      loading.value = false
      setTimeout(() => { message.value = '' }, 3000)
    }, 500)
    
  } catch (error) {
    message.value = '❌ Gagal upload foto'
    messageType.value = 'error'
    loading.value = false
  }
}

// ========== UPDATE PROFIL (PKD20TPA-28) + VALIDASI (PKD20TPA-30) ==========
const updateProfil = async () => {
  // VALIDASI INPUT SEBELUM UPDATE
  if (!formData.value.nama || formData.value.nama.trim().length < 3) {
    message.value = '❌ Nama harus diisi minimal 3 karakter'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  if (!formData.value.username || formData.value.username.trim().length < 3) {
    message.value = '❌ Username harus diisi minimal 3 karakter'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  // Validasi username: hanya huruf, angka, underscore
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  if (!usernameRegex.test(formData.value.username)) {
    message.value = '❌ Username hanya boleh huruf, angka, dan underscore (_)'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  loading.value = true
  
  try {
    // === INTEGRASI API (PKD20TPA-31) ===
    // Nanti ganti dengan endpoint real:
    // const response = await fetch('http://localhost:8000/api/user/profile', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({
    //     nama: formData.value.nama,
    //     username: formData.value.username
    //   })
    // })
    // const result = await response.json()
    
    // Simulasi simpan ke localStorage
    const userData = {
      nama: formData.value.nama,
      username: formData.value.username,
      email: formData.value.email,
      foto_profil: fotoProfil.value
    }
    localStorage.setItem('user_data', JSON.stringify(userData))
    
    message.value = '✅ Profil berhasil diperbarui!'
    messageType.value = 'success'
    
    setTimeout(() => { message.value = '' }, 3000)
  } catch (error) {
    message.value = '❌ Gagal menyimpan perubahan'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

/* ========== STYLE FOTO ========== */
.photo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3498db;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #3498db;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  border: 2px solid white;
}

.photo-hint {
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 0.5rem;
}

/* ========== STYLE FORM ========== */
.form-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.save-btn {
  width: 100%;
  padding: 0.75rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.save-btn:hover:not(:disabled) {
  background: #2980b9;
}

.save-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

/* ========== STYLE MESSAGE ========== */
.message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>