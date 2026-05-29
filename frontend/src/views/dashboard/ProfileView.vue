<template>
  <DashboardLayout>
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
                  v-model="form.nama" 
                  label="Nama Lengkap" 
                  placeholder="Mis. John Doe"
                  :error="errors.nama"
                  required
                />
                <BaseInput 
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
                      v-model="securityForm.newPassword" 
                      type="password"
                      label="Kata Sandi Baru" 
                      placeholder="Minimal 8 karakter"
                      :error="securityErrors.newPassword"
                      required
                    />
                    <BaseInput 
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

    </div>
  </DashboardLayout>
</template>

<script setup>
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
  }

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
}
</script>

<style scoped>
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
  border-radius: 50%;
  object-fit: cover;
}

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
  display: flex;
  flex-direction: column;
  gap: 16px;
}

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
}
</style>