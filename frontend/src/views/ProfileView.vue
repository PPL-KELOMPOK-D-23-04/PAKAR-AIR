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
          <button @click="handleLogout" class="logout-btn">Keluar</button>
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
            <button @click="handleLogout" class="footer-logout-btn">Keluar</button>
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

// ========== COMPUTED ==========
const isLoggedIn = computed(() => {
  return localStorage.getItem('token') !== null
})

// ========== LOGOUT ==========
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_data')
  localStorage.removeItem('user')
  router.push('/login')
}

// ========== LOAD DATA SAAT HALAMAN DIBUKA ==========
onMounted(() => {
  // Cek apakah user sudah login
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }
  loadUserData()
})

// ========== AMBIL DATA USER DARI LOCALSTORAGE/API ==========
const loadUserData = async () => {
  try {
    // Coba ambil dari localStorage dulu
    const savedUser = localStorage.getItem('user_data') || localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      formData.value = {
        nama: user.nama || user.name || '',
        username: user.username || '',
        email: user.email || 'user@pakar-air.com'
      }
      fotoProfil.value = user.foto_profil || null
    }

    // Jika pakai API backend (uncomment saat backend siap)
    /*
    const token = localStorage.getItem('token')
    if (token) {
      const response = await fetch('http://localhost:8000/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const user = await response.json()
        formData.value = {
          nama: user.nama || '',
          username: user.username || '',
          email: user.email || ''
        }
        fotoProfil.value = user.foto_profil || null
      }
    }
    */
  } catch (error) {
    console.error('Gagal load data:', error)
  }
}

// ========== UPDATE FOTO + VALIDASI (PKD20TPA-29 & PKD20TPA-30) ==========
const handleUploadFoto = (event) => {
  const file = event.target.files[0]
  
  // VALIDASI 1: File harus ada
  if (!file) return
  
  // VALIDASI 2: Tipe file harus gambar
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    message.value = '❌ Format file harus JPG, JPEG, atau PNG'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  // VALIDASI 3: Ukuran file max 2MB
  if (file.size > 2 * 1024 * 1024) {
    message.value = '❌ Ukuran file maksimal 2MB'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  // PREVIEW FOTO SEBELUM UPLOAD
  const reader = new FileReader()
  reader.onload = (e) => {
    previewFoto.value = e.target.result
  }
  reader.readAsDataURL(file)
  
  // UPLOAD KE SERVER
  uploadFotoKeServer(file)
}

// ========== UPLOAD FOTO KE API/SERVER ==========
const uploadFotoKeServer = async (file) => {
  loading.value = true
  
  // Simulasi upload (ganti dengan API real saat backend siap)
  setTimeout(() => {
    fotoProfil.value = previewFoto.value
    
    // Simpan ke localStorage
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}')
    userData.foto_profil = previewFoto.value
    localStorage.setItem('user_data', JSON.stringify(userData))
    
    message.value = '✅ Foto profil berhasil diupdate!'
    messageType.value = 'success'
    loading.value = false
    setTimeout(() => { message.value = '' }, 3000)
  }, 500)

  /* PAKAI INI SAAT BACKEND SIAP
  const formDataUpload = new FormData()
  formDataUpload.append('foto_profil', file)
  
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:8000/api/user/upload-photo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataUpload
    })

    if (response.ok) {
      const result = await response.json()
      fotoProfil.value = result.foto_url
      message.value = '✅ Foto profil berhasil diupdate!'
      messageType.value = 'success'
    } else {
      throw new Error('Gagal upload foto')
    }
  } catch (error) {
    message.value = '❌ Gagal upload foto'
    messageType.value = 'error'
  } finally {
    loading.value = false
    setTimeout(() => { message.value = '' }, 3000)
  }
  */
}

// ========== UPDATE PROFIL + VALIDASI (PKD20TPA-28 & PKD20TPA-30) ==========
const updateProfil = async () => {
  // VALIDASI NAMA
  if (!formData.value.nama || formData.value.nama.trim().length < 3) {
    message.value = '❌ Nama harus diisi minimal 3 karakter'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  // VALIDASI USERNAME
  if (!formData.value.username || formData.value.username.trim().length < 3) {
    message.value = '❌ Username harus diisi minimal 3 karakter'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  // VALIDASI USERNAME (hanya huruf, angka, underscore)
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  if (!usernameRegex.test(formData.value.username)) {
    message.value = '❌ Username hanya boleh huruf, angka, dan underscore (_)'
    messageType.value = 'error'
    setTimeout(() => { message.value = '' }, 3000)
    return
  }
  
  loading.value = true
  
  // Simulasi simpan ke localStorage
  setTimeout(() => {
    const userData = {
      nama: formData.value.nama,
      username: formData.value.username,
      email: formData.value.email,
      foto_profil: fotoProfil.value
    }
    localStorage.setItem('user_data', JSON.stringify(userData))
    localStorage.setItem('user', JSON.stringify(userData))
    
    message.value = '✅ Profil berhasil diperbarui!'
    messageType.value = 'success'
    loading.value = false
    setTimeout(() => { message.value = '' }, 3000)
  }, 500)

  /* PAKAI INI SAAT BACKEND SIAP
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:8000/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        nama: formData.value.nama,
        username: formData.value.username
      })
    })

    if (response.ok) {
      message.value = '✅ Profil berhasil diperbarui!'
      messageType.value = 'success'
    } else {
      throw new Error('Gagal update profil')
    }
  } catch (error) {
    message.value = '❌ Gagal menyimpan perubahan'
    messageType.value = 'error'
  } finally {
    loading.value = false
    setTimeout(() => { message.value = '' }, 3000)
  }
  */
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profile-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f4f8;
}

/* ========== NAVBAR ========== */
.navbar {
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.8rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a73e8;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
  padding: 0.5rem 0;
}

.nav-link:hover {
  color: #1a73e8;
}

.nav-link.active {
  color: #1a73e8;
  border-bottom: 2px solid #1a73e8;
}

.logout-btn {
  padding: 0.5rem 1.2rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #c0392b;
}

/* ========== PROFILE CONTAINER ========== */
.profile-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.profile-card {
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.page-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

/* ========== FOTO SECTION ========== */
.photo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1a73e8;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.upload-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #1a73e8;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.1rem;
  border: 2px solid white;
  transition: background 0.2s;
}

.upload-btn:hover {
  background: #1557b0;
}

.photo-hint {
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 0.75rem;
}

/* ========== FORM SECTION ========== */
.form-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 16px;
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
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26,115,232,0.1);
}

.form-input:disabled {
  background: #e9ecef;
  color: #6c757d;
}

.save-btn {
  width: 100%;
  padding: 0.85rem;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.save-btn:hover:not(:disabled) {
  background: #1557b0;
}

.save-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

/* ========== MESSAGE ========== */
.message {
  margin-top: 1.5rem;
  padding: 0.75rem;
  border-radius: 10px;
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

/* ========== FOOTER ========== */
.footer {
  background: #1a1a2e;
  color: white;
  padding: 40px 2rem 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-logo span {
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-logo p {
  margin-top: 0.5rem;
  color: #aaa;
  font-size: 0.85rem;
}

.footer-column h4 {
  margin-bottom: 1rem;
  color: white;
}

.footer-column a {
  display: block;
  color: #aaa;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.footer-column a:hover {
  color: #1a73e8;
}

.footer-logout-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  transition: color 0.2s;
}

.footer-logout-btn:hover {
  color: #e74c3c;
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #333;
  color: #aaa;
  font-size: 0.8rem;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .profile-card {
    padding: 1.5rem;
  }
  
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>