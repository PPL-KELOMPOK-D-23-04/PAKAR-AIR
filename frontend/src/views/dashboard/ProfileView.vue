<template>
  <DashboardLayout>
<<<<<<< HEAD
    <div class="profile-view">
      
      <PageHeader 
        title="Pengaturan Profil" 
        description="Kelola informasi akun, foto profil, dan preferensi keamanan Anda."
      />

      <div class="settings-grid">
        <!-- Sidebar Navigation -->
        <div class="settings-sidebar">
          <nav class="settings-nav">
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'profile' }"
              @click="activeTab = 'profile'"
            >
              <User size="18" />
              <span>Profil Personal</span>
            </button>
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'security' }"
              @click="activeTab = 'security'"
            >
              <ShieldCheck size="18" />
              <span>Keamanan & Sandi</span>
            </button>
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'notifications' }"
              @click="activeTab = 'notifications'"
            >
              <Bell size="18" />
              <span>Preferensi Notifikasi</span>
            </button>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="settings-content">
          
          <!-- TAB: PROFIL PERSONAL -->
          <template v-if="activeTab === 'profile'">
            <!-- Avatar Card -->
            <BaseCard class="avatar-card" padding="lg">
              <div class="avatar-section">
                <div class="avatar-info">
                  <h2 class="section-title">Foto Profil</h2>
                  <p class="section-desc">Ini akan ditampilkan di profil publik dan topbar Anda.</p>
                </div>
                <div class="avatar-action">
                  <div class="avatar-wrapper">
                    <img :src="previewImage || form.foto" class="profile-image" alt="Profile" />
                    <label class="upload-overlay">
                      <Camera size="20" class="camera-icon" />
                      <input type="file" accept="image/png,image/jpeg,image/jpg" @change="handleImageUpload" class="hidden-input" />
                    </label>
                  </div>
                  <div class="upload-hint">
                    <p class="help-text">Disarankan: Persegi, maks 2MB (JPG/PNG).</p>
                  </div>
                </div>
              </div>
            </BaseCard>

            <!-- Form Card -->
            <BaseCard class="form-card" padding="lg">
              <h2 class="section-title">Informasi Personal</h2>
              <p class="section-desc mb-24">Perbarui detail personal dan cara kami menghubungi Anda.</p>
              
              <div class="form-grid">
                <BaseInput 
                  id="profile-name"
                  v-model="form.nama" 
                  label="Nama Lengkap" 
                  placeholder="Mis. John Doe"
                  :error="errors.nama"
                  required
                />
                <BaseInput 
                  id="profile-email"
                  v-model="form.email" 
                  type="email"
                  label="Alamat Email" 
                  placeholder="Mis. john@example.com"
                  :error="errors.email"
                  required
                  disabled
                  helperText="Email tidak dapat diubah setelah registrasi."
                />
              </div>
              
              <div class="form-actions">
                <button class="btn btn--primary btn-save" @click="updateProfile" :disabled="isSaving">
                  <Save size="16" v-if="!isSaving" />
                  <Loader2 size="16" class="spin-icon" v-else />
                  {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </button>
              </div>
            </BaseCard>
          </template>

          <!-- TAB: KEAMANAN & SANDI -->
          <template v-if="activeTab === 'security'">
            <BaseCard padding="lg">
              <h2 class="section-title">Ubah Kata Sandi</h2>
              <p class="section-desc mb-32">Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk tetap aman.</p>
              
              <div class="security-form">
                <div class="form-group-section">
                  <BaseInput 
                    id="profile-old-password"
                    v-model="securityForm.oldPassword" 
                    type="password"
                    label="Kata Sandi Saat Ini" 
                    placeholder="Masukkan kata sandi saat ini"
                    :error="securityErrors.oldPassword"
                    required
                  />
                </div>
                
                <hr class="form-divider" />
                
                <div class="form-group-section">
                  <h4 class="sub-section-title">Kata Sandi Baru</h4>
                  <div class="new-password-grid">
                    <BaseInput 
                      id="profile-new-password"
                      v-model="securityForm.newPassword" 
                      type="password"
                      label="Kata Sandi Baru" 
                      placeholder="Minimal 8 karakter"
                      :error="securityErrors.newPassword"
                      required
                    />
                    <BaseInput 
                      id="profile-confirm-password"
                      v-model="securityForm.confirmPassword" 
                      type="password"
                      label="Konfirmasi Sandi Baru" 
                      placeholder="Ketik ulang kata sandi baru"
                      :error="securityErrors.confirmPassword"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div class="form-actions mt-32">
                <button class="btn btn--primary btn-save" @click="updatePassword" :disabled="isSavingSecurity">
                  <ShieldCheck size="16" v-if="!isSavingSecurity" />
                  <Loader2 size="16" class="spin-icon" v-else />
                  {{ isSavingSecurity ? 'Memperbarui...' : 'Perbarui Sandi' }}
                </button>
              </div>
            </BaseCard>
          </template>

          <!-- TAB: NOTIFIKASI -->
          <template v-if="activeTab === 'notifications'">
            <BaseCard padding="lg">
              <h2 class="section-title">Preferensi Notifikasi</h2>
              <p class="section-desc mb-24">Pilih pemberitahuan yang ingin Anda terima via Email dan In-App.</p>
              
              <div class="notification-list">
                
                <div class="notification-item">
                  <div class="notif-info">
                    <h4 class="notif-title">Analisis Selesai</h4>
                    <p class="notif-desc">Dapatkan pemberitahuan saat hasil analisis air sudah tersedia.</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="notifPrefs.analysis" />
                    <span class="slider"></span>
                  </label>
                </div>

                <div class="notification-item">
                  <div class="notif-info">
                    <h4 class="notif-title">Artikel & Edukasi Baru</h4>
                    <p class="notif-desc">Dapatkan tips dan artikel terbaru seputar kualitas air.</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="notifPrefs.education" />
                    <span class="slider"></span>
                  </label>
                </div>

                <div class="notification-item">
                  <div class="notif-info">
                    <h4 class="notif-title">Pembaruan Sistem</h4>
                    <p class="notif-desc">Informasi terkait pemeliharaan dan fitur baru di aplikasi.</p>
                  </div>
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="notifPrefs.updates" />
                    <span class="slider"></span>
                  </label>
                </div>

              </div>
              
              <div class="form-actions mt-32">
                <button class="btn btn--primary btn-save" @click="updateNotifications" :disabled="isSavingNotif">
                  <Bell size="16" v-if="!isSavingNotif" />
                  <Loader2 size="16" class="spin-icon" v-else />
                  {{ isSavingNotif ? 'Menyimpan...' : 'Simpan Preferensi' }}
                </button>
              </div>
            </BaseCard>
          </template>

        </div>
      </div>

      <!-- Premium Toast Notification -->
      <Transition name="toast">
        <div v-if="message" class="toast-message" :class="isError ? 'toast-error' : 'toast-success'">
          <div class="toast-icon">
            <CheckCircle v-if="!isError" size="18" />
            <AlertCircle v-else size="18" />
          </div>
          <p class="toast-text">{{ message }}</p>
        </div>
      </Transition>

=======
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
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
    </div>
  </DashboardLayout>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { User, ShieldCheck, Bell, Camera, Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-vue-next'

const activeTab = ref('profile')

// Toasts
const message = ref('')
const isError = ref(false)
const showMessage = (msg, error = false) => {
  message.value = msg
  isError.value = error
  setTimeout(() => { message.value = '' }, 3500)
}

// ----------------------
// TAB 1: PROFILE
// ----------------------
const previewImage = ref(null)
const isSaving = ref(false)

const form = ref({
  nama: '',
  email: '',
  foto: 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&size=200'
})

const errors = ref({ nama: '', email: '' })

onMounted(() => {
  try {
    const user = JSON.parse(sessionStorage.getItem('pakar_air_user') || '{}')
    if (user.full_name) form.value.nama = user.full_name
    if (user.email) form.value.email = user.email
    form.value.foto = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.value.nama || 'User')}&background=3b82f6&color=fff&size=200`
  } catch (err) {}
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    showMessage('Format gambar harus PNG/JPG/JPEG', true)
    return
=======
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
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
  }
})

<<<<<<< HEAD
  if (file.size > 2 * 1024 * 1024) {
    showMessage('Ukuran gambar maksimal 2MB', true)
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => { previewImage.value = e.target.result }
  reader.readAsDataURL(file)
  showMessage('Foto berhasil dipilih', false)
}

const updateProfile = () => {
  errors.value = { nama: '', email: '' }
  if (form.value.nama.length < 3) {
    errors.value.nama = 'Nama minimal 3 karakter'
    return
  }
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    try {
      const user = JSON.parse(sessionStorage.getItem('pakar_air_user') || '{}')
      user.full_name = form.value.nama
      sessionStorage.setItem('pakar_air_user', JSON.stringify(user))
    } catch(e) {}
    showMessage('Profil personal berhasil diperbarui', false)
  }, 800)
}

// ----------------------
// TAB 2: SECURITY
// ----------------------
const isSavingSecurity = ref(false)
const securityForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const securityErrors = ref({ oldPassword: '', newPassword: '', confirmPassword: '' })

const updatePassword = () => {
  securityErrors.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
  let valid = true

  if (!securityForm.value.oldPassword) {
    securityErrors.value.oldPassword = 'Kata sandi saat ini wajib diisi'
    valid = false
  }
  if (securityForm.value.newPassword.length < 8) {
    securityErrors.value.newPassword = 'Kata sandi baru minimal 8 karakter'
    valid = false
  }
  if (securityForm.value.newPassword !== securityForm.value.confirmPassword) {
    securityErrors.value.confirmPassword = 'Konfirmasi kata sandi tidak cocok'
    valid = false
  }

  if (!valid) return

  isSavingSecurity.value = true
  setTimeout(() => {
    isSavingSecurity.value = false
    securityForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
    showMessage('Kata sandi berhasil diperbarui', false)
  }, 1000)
}

// ----------------------
// TAB 3: NOTIFICATIONS
// ----------------------
const isSavingNotif = ref(false)
const notifPrefs = ref({
  analysis: true,
  education: false,
  updates: true
})

const updateNotifications = () => {
  isSavingNotif.value = true
  setTimeout(() => {
    isSavingNotif.value = false
    showMessage('Preferensi notifikasi berhasil disimpan', false)
  }, 800)
=======
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
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
}
</script>

<style scoped>
<<<<<<< HEAD
.profile-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (min-width: 1024px) {
  .settings-grid {
    flex-direction: row;
    align-items: flex-start;
  }
}

/* Sidebar Nav */
.settings-sidebar {
  width: 100%;
}

@media (min-width: 1024px) {
  .settings-sidebar {
    width: 260px;
    flex-shrink: 0;
    position: sticky;
    top: calc(var(--topbar-height) + 24px);
  }
}

.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.nav-item:hover {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.nav-item.active {
  background: var(--color-surface);
  color: var(--color-primary);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
}

/* Main Content */
.settings-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0; /* Prevent overflow */
  max-width: 880px; /* Prevent excessive stretching on ultra-wide screens */
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 6px 0;
}

.section-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

.mb-24 { margin-bottom: 24px; }
.mb-32 { margin-bottom: 32px; }
.mt-32 { margin-top: 32px; }

/* Avatar Section */
.avatar-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 640px) {
  .avatar-section {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.avatar-action {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-wrapper {
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  padding: 4px;
  background: var(--color-bg);
}

.profile-image {
  width: 100%;
  height: 100%;
=======
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
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
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

<<<<<<< HEAD
.upload-overlay {
  position: absolute;
  inset: 4px; /* inside padding */
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.avatar-wrapper:hover .upload-overlay {
  opacity: 1;
}

.camera-icon {
  color: white;
}

.hidden-input {
  display: none;
}

.upload-hint .help-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin: 0;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.security-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group-section {
  display: flex;
  flex-direction: column;
}

.sub-section-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.new-password-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .new-password-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.form-divider {
  border: none;
  border-top: 1px solid var(--color-border-light);
  margin: 24px 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--color-border-light);
  padding-top: 24px;
}

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 160px;
  justify-content: center;
}

.spin-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin { 100% { transform: rotate(360deg); } }

/* Notification List */
.notification-list {
=======
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
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
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

<<<<<<< HEAD
.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
}

.notif-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notif-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.notif-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin: 0;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: var(--color-border-strong);
  transition: .3s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* Toast */
.toast-message {
  position: fixed;
  bottom: 32px;
  right: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  font-size: var(--font-size-sm);
  font-weight: 500;
  max-width: 400px;
}

.toast-success {
  background: var(--color-surface);
  border: 1px solid var(--color-success);
  color: var(--color-text-primary);
}

.toast-success .toast-icon { color: var(--color-success); }

.toast-error {
  background: var(--color-danger);
  border: 1px solid var(--color-danger);
  color: white;
}

.toast-error .toast-icon { color: white; }

.toast-text {
  margin: 0;
  line-height: 1.4;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
=======
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
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
}
</style>