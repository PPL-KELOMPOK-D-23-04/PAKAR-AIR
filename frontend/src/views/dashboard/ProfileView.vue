<template>
  <div class="profile-container">
    <!-- Background Decoration -->
    <div class="bg-decoration"></div>

    <!-- Header Section -->
    <div class="profile-header">
      <div class="header-content">
        <div class="header-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div class="header-text">
          <h1>Profil Saya</h1>
          <p>Kelola informasi akun dan tingkatkan keamanan data Anda</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="profile-main">
      <!-- Sidebar Kiri -->
      <div class="profile-sidebar">
        <!-- Avatar Card -->
        <div class="card avatar-card">
          <div class="avatar-wrapper">
            <div class="avatar-container" @click="triggerFileInput">
              <img 
                :src="avatarPreview || profileData?.avatar_url || defaultAvatar" 
                alt="Profile Avatar"
                class="avatar-image"
              />
              <div class="avatar-overlay">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>Ganti Foto</span>
              </div>
            </div>
            <input 
              ref="fileInput"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style="display: none"
              @change="handleFileUpload"
            />
          </div>
          <button v-if="profileData?.avatar_url" class="btn-remove-avatar" @click="handleDeleteAvatar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Hapus Foto
          </button>
          <div class="avatar-name">{{ profileData?.fullname || 'Pengguna' }}</div>
          <div class="avatar-role" :class="profileData?.role === 'admin' ? 'role-admin' : 'role-user'">
            {{ profileData?.role === 'admin' ? 'Administrator' : 'Pengguna Terdaftar' }}
          </div>
        </div>

        <!-- Stats Card -->
        <div class="card stats-card">
          <div class="stats-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>Statistik Akun</span>
          </div>
          <div class="stats-list">
            <div class="stat-item">
              <span class="stat-label">Bergabung Sejak</span>
              <span class="stat-value">{{ formatDate(profileData?.created_at) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Analisis</span>
              <span class="stat-value">{{ profileData?.total_analyses || 0 }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">ID Pengguna</span>
              <span class="stat-value">#{{ profileData?.user_id || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Security Tips Card -->
        <div class="card tips-card">
          <div class="tips-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Tips Keamanan</span>
          </div>
          <ul class="tips-list">
            <li>Gunakan password yang kuat dan unik</li>
            <li>Jangan bagikan password kepada siapapun</li>
            <li>Update password secara berkala</li>
            <li>Gunakan foto profil yang jelas</li>
          </ul>
        </div>
      </div>

      <!-- Main Content Kanan -->
      <div class="profile-content">
        <!-- Tab Navigation -->
        <div class="tab-navigation">
          <button 
            :class="['tab-button', { active: activeTab === 'info' }]"
            @click="activeTab = 'info'"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Informasi Profil
          </button>
          <button 
            :class="['tab-button', { active: activeTab === 'security' }]"
            @click="activeTab = 'security'"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Keamanan Akun
          </button>
        </div>

        <!-- Tab Content: Informasi Profil -->
        <div v-if="activeTab === 'info'" class="tab-content">
          <form @submit.prevent="handleUpdateProfile" class="profile-form">
            <div class="form-section">
              <h3 class="section-title">Informasi Dasar</h3>
              
              <div class="form-group">
                <label class="form-label">Nama Lengkap</label>
                <div class="input-wrapper">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input 
                    type="text" 
                    v-model="profileForm.fullname"
                    class="form-input"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Username</label>
                <div class="input-wrapper">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input 
                    type="text" 
                    v-model="profileForm.username"
                    class="form-input"
                    placeholder="Masukkan username"
                  />
                </div>
                <p class="form-hint">Username akan digunakan untuk login ke akun Anda</p>
              </div>

              <div class="form-group">
                <label class="form-label">Alamat Email</label>
                <div class="input-wrapper">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input 
                    type="email" 
                    v-model="profileForm.email"
                    class="form-input"
                    placeholder="Masukkan alamat email"
                  />
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="profileLoading">
                <span v-if="profileLoading" class="btn-spinner"></span>
                <span v-else>Simpan Perubahan</span>
              </button>
            </div>

            <!-- Alert Messages -->
            <transition name="fade">
              <div v-if="profileSuccess" class="alert alert-success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {{ profileSuccess }}
              </div>
            </transition>
            <transition name="fade">
              <div v-if="profileError" class="alert alert-error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {{ profileError }}
              </div>
            </transition>
          </form>
        </div>

        <!-- Tab Content: Keamanan Akun -->
        <div v-if="activeTab === 'security'" class="tab-content">
          <form @submit.prevent="handleUpdatePassword" class="profile-form">
            <div class="form-section">
              <h3 class="section-title">Ubah Password</h3>
              <p class="section-desc">Pastikan password baru Anda aman dan tidak mudah ditebak</p>

              <div class="form-group">
                <label class="form-label">Password Saat Ini</label>
                <div class="input-wrapper">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input 
                    :type="showCurrentPassword ? 'text' : 'password'"
                    v-model="passwordForm.current_password"
                    class="form-input"
                    placeholder="Masukkan password saat ini"
                  />
                  <button type="button" class="password-toggle" @click="showCurrentPassword = !showCurrentPassword">
                    <svg v-if="!showCurrentPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Password Baru</label>
                <div class="input-wrapper">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input 
                    :type="showNewPassword ? 'text' : 'password'"
                    v-model="passwordForm.new_password"
                    class="form-input"
                    placeholder="Masukkan password baru"
                  />
                  <button type="button" class="password-toggle" @click="showNewPassword = !showNewPassword">
                    <svg v-if="!showNewPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
                <div class="password-strength" v-if="passwordForm.new_password">
                  <div class="strength-bar" :class="passwordStrength.class"></div>
                  <span class="strength-text">{{ passwordStrength.text }}</span>
                </div>
                <p class="form-hint">Minimal 6 karakter. Gunakan kombinasi huruf besar, kecil, angka, dan simbol</p>
              </div>

              <div class="form-group">
                <label class="form-label">Konfirmasi Password Baru</label>
                <div class="input-wrapper">
                  <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="passwordForm.confirm_password"
                    class="form-input"
                    placeholder="Konfirmasi password baru"
                  />
                  <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                    <svg v-if="!showConfirmPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  </button>
                </div>
                <div v-if="passwordForm.confirm_password && passwordForm.new_password !== passwordForm.confirm_password" class="form-error">
                  Password baru dan konfirmasi tidak cocok
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary" :disabled="passwordLoading">
                <span v-if="passwordLoading" class="btn-spinner"></span>
                <span v-else>Ubah Password</span>
              </button>
            </div>

            <!-- Alert Messages -->
            <transition name="fade">
              <div v-if="passwordSuccess" class="alert alert-success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {{ passwordSuccess }}
              </div>
            </transition>
            <transition name="fade">
              <div v-if="passwordError" class="alert alert-error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {{ passwordError }}
              </div>
            </transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'

const authStore = useAuthStore()
const profileStore = useProfileStore()

// ============ STATE ============
const activeTab = ref('info')
const fileInput = ref(null)
const avatarPreview = ref(null)

// Profile Form
const profileForm = reactive({
  fullname: '',
  username: '',
  email: ''
})
const profileLoading = ref(false)
const profileSuccess = ref('')
const profileError = ref('')

// Password Form
const passwordForm = reactive({
  current_password: '',
  new_password: '',
  confirm_password: ''
})
const passwordLoading = ref(false)
const passwordSuccess = ref('')
const passwordError = ref('')

// Password visibility
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// ============ COMPUTED ============
const profileData = computed(() => profileStore.profile)
const defaultAvatar = 'https://ui-avatars.com/api/?background=2c7da0&color=fff&bold=true&size=140&name='

const userId = computed(() => authStore.user?.user_id || authStore.user?.id)

// Password Strength Checker
const passwordStrength = computed(() => {
  const pass = passwordForm.new_password
  if (!pass) return { class: '', text: '' }
  
  let strength = 0
  if (pass.length >= 6) strength++
  if (pass.length >= 10) strength++
  if (/[A-Z]/.test(pass)) strength++
  if (/[0-9]/.test(pass)) strength++
  if (/[^A-Za-z0-9]/.test(pass)) strength++
  
  if (strength <= 2) return { class: 'weak', text: 'Lemah' }
  if (strength <= 4) return { class: 'medium', text: 'Sedang' }
  return { class: 'strong', text: 'Kuat' }
})

// ============ METHODS ============

// Load profile data
const loadProfile = async () => {
  if (userId.value) {
    await profileStore.fetchProfile(userId.value)
    if (profileData.value) {
      profileForm.fullname = profileData.value.fullname || ''
      profileForm.username = profileData.value.username || ''
      profileForm.email = profileData.value.email || ''
    }
  }
}

// Update profile
const handleUpdateProfile = async () => {
  profileLoading.value = true
  profileSuccess.value = ''
  profileError.value = ''

  try {
    const data = {}
    if (profileForm.fullname !== profileData.value?.fullname) data.fullname = profileForm.fullname
    if (profileForm.username !== profileData.value?.username) data.username = profileForm.username
    if (profileForm.email !== profileData.value?.email) data.email = profileForm.email

    if (Object.keys(data).length > 0) {
      await profileStore.updateProfile(userId.value, data)
      profileSuccess.value = 'Profil berhasil diperbarui'
      setTimeout(() => profileSuccess.value = '', 3000)
    } else {
      profileSuccess.value = 'Tidak ada perubahan yang disimpan'
      setTimeout(() => profileSuccess.value = '', 2000)
    }
  } catch (err) {
    profileError.value = err.response?.data?.detail || 'Gagal memperbarui profil'
    setTimeout(() => profileError.value = '', 3000)
  } finally {
    profileLoading.value = false
  }
}

// Update password
const handleUpdatePassword = async () => {
  if (passwordForm.new_password !== passwordForm.confirm_password) {
    passwordError.value = 'Password baru tidak cocok'
    setTimeout(() => passwordError.value = '', 3000)
    return
  }

  if (passwordForm.new_password.length < 6) {
    passwordError.value = 'Password minimal 6 karakter'
    setTimeout(() => passwordError.value = '', 3000)
    return
  }

  passwordLoading.value = true
  passwordError.value = ''
  passwordSuccess.value = ''

  try {
    await profileStore.updatePassword(userId.value, {
      current_password: passwordForm.current_password,
      new_password: passwordForm.new_password,
      confirm_password: passwordForm.confirm_password
    })
    passwordSuccess.value = 'Password berhasil diubah'
    passwordForm.current_password = ''
    passwordForm.new_password = ''
    passwordForm.confirm_password = ''
    setTimeout(() => passwordSuccess.value = '', 3000)
  } catch (err) {
    passwordError.value = err.response?.data?.detail || 'Gagal mengubah password'
    setTimeout(() => passwordError.value = '', 3000)
  } finally {
    passwordLoading.value = false
  }
}

// Avatar handlers
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    profileError.value = 'Format file tidak didukung. Gunakan JPG, PNG, atau WEBP'
    setTimeout(() => profileError.value = '', 3000)
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    profileError.value = 'Ukuran file maksimal 2MB'
    setTimeout(() => profileError.value = '', 3000)
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target?.result
  }
  reader.readAsDataURL(file)

  try {
    await profileStore.updateAvatar(userId.value, file)
    profileSuccess.value = 'Foto profil berhasil diperbarui'
    setTimeout(() => profileSuccess.value = '', 3000)
  } catch (err) {
    profileError.value = err.response?.data?.detail || 'Gagal mengupload foto'
    setTimeout(() => profileError.value = '', 3000)
  }
}

const handleDeleteAvatar = async () => {
  try {
    await profileStore.deleteAvatar(userId.value)
    avatarPreview.value = null
    profileSuccess.value = 'Foto profil berhasil dihapus'
    setTimeout(() => profileSuccess.value = '', 3000)
  } catch (err) {
    profileError.value = err.response?.data?.detail || 'Gagal menghapus foto'
    setTimeout(() => profileError.value = '', 3000)
  }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// ============ LIFECYCLE ============
onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
/* ============================================ */
/* PROFILE PAGE - PAKAR-AIR ELEGANT STYLE      */
/* ============================================ */

.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  background: linear-gradient(135deg, #1e4a6e 0%, #2c7da0 50%, #61a5c2 100%);
  border-radius: 0 0 40px 40px;
  z-index: 0;
}

/* Header */
.profile-header {
  position: relative;
  z-index: 1;
  padding: 32px 40px 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.header-text h1 {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}

.header-text p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

/* Main Content */
.profile-main {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 28px;
  padding: 32px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ========== SIDEBAR STYLES ========== */
.card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* Avatar Card */
.avatar-card {
  text-align: center;
  margin-bottom: 24px;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s;
}

.avatar-container:hover {
  transform: scale(1.02);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 0 12px;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
  font-size: 10px;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.btn-remove-avatar {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-size: 12px;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 30px;
  transition: all 0.2s;
  margin-top: 8px;
}

.btn-remove-avatar:hover {
  color: #dc2626;
  background: #fef2f2;
}

.avatar-name {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  margin-top: 12px;
}

.avatar-role {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 30px;
  margin-top: 8px;
}

.role-admin {
  background: #eef2ff;
  color: #2c7da0;
}

.role-user {
  background: #f1f5f9;
  color: #475569;
}

/* Stats Card */
.stats-header, .tips-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #eef2f5;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

/* Tips Card */
.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  font-size: 12px;
  color: #475569;
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
}

.tips-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #2c7da0;
  font-weight: bold;
}

/* ========== MAIN CONTENT STYLES ========== */
.profile-content {
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  border-bottom: 1px solid #eef2f5;
  padding: 0 28px;
  background: white;
  gap: 8px;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tab-button:hover {
  color: #2c7da0;
}

.tab-button.active {
  color: #2c7da0;
  border-bottom-color: #2c7da0;
}

/* Tab Content */
.tab-content {
  padding: 32px 40px;
}

/* Form Styles */
.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 6px;
}

.section-desc {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  font-size: 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  transition: all 0.2s;
  background: white;
  outline: none;
}

.form-input:focus {
  border-color: #2c7da0;
  box-shadow: 0 0 0 3px rgba(44, 125, 160, 0.1);
}

.form-hint {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 6px;
}

.form-error {
  font-size: 11px;
  color: #dc2626;
  margin-top: 6px;
}

/* Password Toggle */
.password-toggle {
  position: absolute;
  right: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  padding: 4px;
  display: flex;
  align-items: center;
}

.password-toggle:hover {
  color: #2c7da0;
}

/* Password Strength */
.password-strength {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.strength-bar {
  height: 4px;
  width: 60px;
  border-radius: 4px;
  background: #e2e8f0;
}

.strength-bar.weak {
  background: #dc2626;
  width: 30px;
}

.strength-bar.medium {
  background: #f59e0b;
  width: 60px;
}

.strength-bar.strong {
  background: #10b981;
  width: 90px;
}

.strength-text {
  font-size: 11px;
  font-weight: 500;
}

/* Buttons */
.form-actions {
  margin-top: 16px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 32px;
  background: linear-gradient(135deg, #2c7da0 0%, #1e4a6e 100%);
  color: white;
  border: none;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(44, 125, 160, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Alert Messages */
.alert {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 13px;
}

.alert-success {
  background: #f0fdf4;
  color: #16a34a;
  border-left: 3px solid #16a34a;
}

.alert-error {
  background: #fef2f2;
  color: #dc2626;
  border-left: 3px solid #dc2626;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1000px) {
  .profile-main {
    grid-template-columns: 1fr;
    padding: 24px;
  }
  
  .profile-sidebar {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .profile-header {
    padding: 24px 20px 0;
  }
  
  .profile-main {
    padding: 20px;
  }
  
  .header-text h1 {
    font-size: 22px;
  }
  
  .tab-navigation {
    padding: 0 16px;
  }
  
  .tab-button {
    padding: 12px 16px;
    font-size: 13px;
  }
  
  .tab-content {
    padding: 24px;
  }
  
  .card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .tab-button span {
    display: none;
  }
  
  .tab-button svg {
    margin: 0;
  }
  
  .form-actions {
    text-align: center;
  }
  
  .btn-primary {
    width: 100%;
  }
}
</style>