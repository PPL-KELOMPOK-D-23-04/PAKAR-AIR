<template>
  <DashboardLayout>
    <div class="profile-container">
      <div class="profile-header">
        <h2>Profil</h2>
        <p>Kelola informasi profil Anda</p>
      </div>

      <div class="profile-content">
        <!-- Left Side: Avatar Card -->
        <div class="avatar-card">
          <div class="avatar-wrapper">
            <img v-if="authStore.currentUser?.avatar_url" :src="authStore.currentUser.avatar_url" class="avatar-img" />
            <div v-else class="avatar-placeholder">{{ userInitial }}</div>
          </div>
          <h3>{{ authStore.currentUser?.full_name || authStore.currentUser?.username || 'Pengguna' }}</h3>
          <p>User</p>
          <div class="upload-btn-wrapper">
            <button class="upload-btn" :disabled="authStore.isLoading">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Upload Foto
            </button>
            <input type="file" accept="image/png,image/jpeg,image/jpg" @change="handleImageUpload" :disabled="authStore.isLoading" class="file-input" />
          </div>
        </div>

        <!-- Right Side: Info & Security -->
        <div class="info-security-wrapper">
          
          <!-- Informasi Profil -->
          <div class="info-card">
            <div class="card-header">
              <h3>Informasi Profil</h3>
              <button class="edit-btn" @click="isEditing = !isEditing">
                {{ isEditing ? 'Batal' : 'Edit Profil' }}
              </button>
            </div>
            
            <div class="form-group">
              <label>Nama Lengkap</label>
              <div class="input-with-icon">
                <div class="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <input type="text" v-model="form.nama" :disabled="!isEditing || authStore.isLoading" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Username</label>
              <div class="input-with-icon">
                <div class="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <input type="text" v-model="form.username" :disabled="!isEditing || authStore.isLoading" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Tanggal Bergabung</label>
              <div class="input-with-icon">
                <div class="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <input type="text" :value="formatDate(authStore.currentUser?.created_at)" disabled />
              </div>
            </div>

            <button v-if="isEditing" class="save-btn" @click="updateProfile" :disabled="authStore.isLoading">
              {{ authStore.isLoading ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </button>
          </div>
          
          <!-- Keamanan -->
          <div class="security-card">
            <h3>Keamanan</h3>
            
            <div class="security-item">
              <div class="security-text">
                <h4>Ganti Password</h4>
                <p>Pastikan akun Anda menggunakan password yang kuat untuk menjaga keamanan</p>
              </div>
              <button class="change-pw-btn" @click="showPasswordForm = !showPasswordForm">
                Ganti Password
              </button>
            </div>
            
            <div v-if="showPasswordForm" class="password-form">
              <div class="form-group">
                <input type="password" v-model="newPassword" placeholder="Masukkan password baru minimal 6 karakter" :disabled="authStore.isLoading" />
              </div>
              <button class="save-btn" @click="changePassword" :disabled="authStore.isLoading">
                {{ authStore.isLoading ? 'Memproses...' : 'Simpan Password' }}
              </button>
            </div>
          </div>
          
          <!-- Notifikasi Global untuk Halaman -->
          <div v-if="message" class="message" :class="{ 'error-message': isError }">
            {{ message }}
          </div>
          
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const isEditing = ref(false)
const showPasswordForm = ref(false)
const message = ref('')
const isError = ref(false)
const newPassword = ref('')

const form = ref({
  nama: '',
  username: ''
})

const userInitial = computed(() => {
  const name = authStore.currentUser?.full_name || authStore.currentUser?.username || 'User'
  return name.charAt(0).toUpperCase()
})

onMounted(async () => {
  await authStore.fetchProfile()
  if (authStore.currentUser) {
    form.value.nama = authStore.currentUser.full_name || ''
    form.value.username = authStore.currentUser.username || ''
  }
})

const formatDate = (dateString) => {
  if (!dateString) return '2025-01-15' // Fallback
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

const showMessage = (msg, error = false) => {
  message.value = msg
  isError.value = error
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

// UPLOAD FOTO
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    showMessage('Format gambar harus PNG/JPG/JPEG', true)
    return
  }
  if (file.size > 2 * 1024 * 1024) {
    showMessage('Ukuran gambar maksimal 2MB', true)
    return
  }

  showMessage('Mengunggah foto...', false)
  const res = await authStore.uploadAvatar(file)
  if (res.success) {
    showMessage('Foto berhasil diperbarui', false)
  } else {
    showMessage(res.message || 'Gagal mengunggah foto', true)
  }
}

// UPDATE PROFILE
const updateProfile = async () => {
  if (form.value.nama.length < 3) {
    showMessage('Nama minimal 3 karakter', true)
    return
  }
  if (form.value.username.length < 3) {
    showMessage('Username minimal 3 karakter', true)
    return
  }
  const regex = /^[a-zA-Z0-9_]+$/
  if (!regex.test(form.value.username)) {
    showMessage('Username hanya boleh huruf, angka, underscore', true)
    return
  }

  const res = await authStore.updateProfile({
    full_name: form.value.nama,
    username: form.value.username
  })
  
  if (res.success) {
    showMessage('Profile berhasil diperbarui', false)
    isEditing.value = false
  } else {
    showMessage(res.message || 'Terjadi kesalahan', true)
  }
}

// UBAH PASSWORD
const changePassword = async () => {
  if (newPassword.value.length < 6) {
    showMessage('Password baru minimal 6 karakter', true)
    return
  }
  
  const res = await authStore.changePassword(newPassword.value)
  if (res.success) {
    showMessage('Password berhasil diubah', false)
    newPassword.value = ''
    showPasswordForm.value = false
  } else {
    showMessage(res.message || 'Gagal mengubah password', true)
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 900px;
  margin: 0 auto;
}

.profile-header {
  margin-bottom: 24px;
}

.profile-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 4px;
}

.profile-header p {
  color: #718096;
  font-size: 14px;
}

.profile-content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* Avatar Card */
.avatar-card {
  background: white;
  border-radius: 12px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  width: 280px;
  flex-shrink: 0;
}

.avatar-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 16px;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 4px;
  text-align: center;
}

.avatar-card p {
  color: #718096;
  font-size: 14px;
  margin-bottom: 24px;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
}

.upload-btn {
  border: 1px solid #e2e8f0;
  color: #4a5568;
  background-color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
}

.upload-btn:hover {
  background-color: #f7fafc;
}

.file-input {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
}

/* Right Section */
.info-security-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.info-card, .security-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.info-card h3, .security-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
}

.edit-btn {
  background: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: #f7fafc;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  color: #4a5568;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.icon-wrapper {
  position: absolute;
  left: 12px;
  color: #a0aec0;
  display: flex;
  align-items: center;
}

.input-with-icon input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #2d3748;
  transition: border-color 0.2s;
}

.input-with-icon input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.input-with-icon input:disabled {
  background-color: #f7fafc;
  color: #718096;
}

.save-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}

.save-btn:hover {
  background: #2563eb;
}

.save-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Security Section */
.security-card h3 {
  margin-bottom: 20px;
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.security-text h4 {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
}

.security-text p {
  font-size: 13px;
  color: #718096;
}

.change-pw-btn {
  background: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.change-pw-btn:hover {
  background: #f7fafc;
}

.password-form {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #edf2f7;
}

.password-form .form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #f0fdf4;
  color: #166534;
  font-size: 14px;
  border: 1px solid #bbf7d0;
}

.error-message {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
  }
  
  .avatar-card {
    width: 100%;
  }
  
  .security-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>