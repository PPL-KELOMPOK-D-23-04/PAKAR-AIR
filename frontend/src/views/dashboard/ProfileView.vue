<template>
  <DashboardLayout>
    <div class="profile-view">

      <!-- Header -->
      <header class="workspace-header">
        <div>
          <p class="header-eyebrow">PakarAir — Manajemen Akun</p>
          <h1 class="workspace-title">Pengaturan Profil</h1>
          <p class="workspace-desc">Kelola informasi akun, foto profil, dan preferensi keamanan Anda.</p>
        </div>
      </header>

      <div class="settings-layout">

        <!-- Sidebar -->
        <aside class="settings-sidebar">
          <span class="sidebar-label">Navigasi</span>
          <nav class="settings-nav">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="nav-item"
              :class="{ 'nav-item--active': activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              <component :is="tab.icon" :size="14" class="nav-icon" />
              <span class="nav-label">{{ tab.label }}</span>
              <span v-if="activeTab === tab.id" class="nav-badge">Aktif</span>
            </button>
          </nav>

          <div class="sidebar-divider" />

          <div class="sidebar-meta">
            <span class="sidebar-meta-label">Bergabung</span>
            <span class="sidebar-meta-value">{{ joinDate }}</span>
          </div>
        </aside>

        <!-- Content Panels -->
        <div class="settings-content">

          <!-- ─── TAB: PROFIL ─── -->
          <template v-if="activeTab === 'profile'">

            <!-- Avatar + Info Panel -->
            <div class="panel">
              <div class="panel-head">
                <span class="panel-title">Foto Profil</span>
                <span class="panel-hint">Maks 2MB · JPG/PNG</span>
              </div>
              <div class="panel-body">
                <div class="avatar-row">
                  <div class="avatar-wrap">
                    <img
                      :src="previewImage || form.foto"
                      class="avatar-img"
                      alt="Profile"
                    />
                    <label class="avatar-overlay" tabindex="0" aria-label="Ganti foto profil">
                      <Camera size="16" />
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        @change="handleImageUpload"
                        class="sr-only"
                      />
                    </label>
                  </div>
                  <div class="avatar-meta">
                    <p class="avatar-name">{{ form.nama || 'Nama Pengguna' }}</p>
                    <p class="avatar-email">{{ form.email }}</p>
                    <label class="btn-upload" tabindex="0">
                      <ArrowUp size="11" />
                      Ganti Foto
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        @change="handleImageUpload"
                        class="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <!-- Personal info fields -->
                <div class="form-grid">
                  <div class="field">
                    <label class="field-label" for="p-name">Nama Lengkap</label>
                    <input
                      id="p-name"
                      v-model="form.nama"
                      type="text"
                      class="field-input"
                      :class="{ 'field-input--error': errors.nama }"
                      placeholder="Mis. Budi Santoso"
                    />
                    <span v-if="errors.nama" class="field-error">{{ errors.nama }}</span>
                  </div>
                  <div class="field">
                    <label class="field-label" for="p-email">Alamat Email</label>
                    <input
                      id="p-email"
                      v-model="form.email"
                      type="email"
                      class="field-input field-input--disabled"
                      disabled
                    />
                    <span class="field-hint">Email tidak dapat diubah setelah registrasi.</span>
                  </div>
                </div>
              </div>
              <div class="panel-foot">
                <button class="btn-cancel" @click="resetForm">Batalkan</button>
                <button class="btn-save" @click="updateProfile" :disabled="isSaving">
                  <Loader2 v-if="isSaving" size="12" class="spin" />
                  <Check v-else size="12" />
                  {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </button>
              </div>
            </div>

          </template>

          <!-- ─── TAB: KEAMANAN ─── -->
          <template v-if="activeTab === 'security'">
            <div class="panel">
              <div class="panel-head">
                <span class="panel-title">Keamanan & Sandi</span>
                <span class="panel-hint">Gunakan sandi yang kuat dan unik</span>
              </div>
              <div class="panel-body">

                <!-- Current password -->
                <div class="sec-section">
                  <span class="sec-section-label">Verifikasi Identitas</span>
                  <div class="field" style="max-width: 380px">
                    <label class="field-label" for="s-old">Kata Sandi Saat Ini</label>
                    <div class="pw-wrap">
                      <input
                        id="s-old"
                        v-model="securityForm.oldPassword"
                        :type="showOld ? 'text' : 'password'"
                        class="field-input"
                        :class="{ 'field-input--error': securityErrors.oldPassword }"
                        placeholder="Masukkan kata sandi saat ini"
                      />
                      <button class="pw-toggle" @click="showOld = !showOld" type="button" tabindex="-1">
                        <Eye v-if="!showOld" size="13" />
                        <EyeOff v-else size="13" />
                      </button>
                    </div>
                    <span v-if="securityErrors.oldPassword" class="field-error">{{ securityErrors.oldPassword }}</span>
                  </div>
                </div>

                <!-- New password -->
                <div class="sec-section">
                  <span class="sec-section-label">Sandi Baru</span>
                  <div class="form-grid">
                    <div class="field">
                      <label class="field-label" for="s-new">Kata Sandi Baru</label>
                      <div class="pw-wrap">
                        <input
                          id="s-new"
                          v-model="securityForm.newPassword"
                          :type="showNew ? 'text' : 'password'"
                          class="field-input"
                          :class="{ 'field-input--error': securityErrors.newPassword }"
                          placeholder="Min. 8 karakter"
                        />
                        <button class="pw-toggle" @click="showNew = !showNew" type="button" tabindex="-1">
                          <Eye v-if="!showNew" size="13" />
                          <EyeOff v-else size="13" />
                        </button>
                      </div>
                      <!-- Strength bar -->
                      <div class="strength-bar" v-if="securityForm.newPassword">
                        <div
                          v-for="i in 4"
                          :key="i"
                          class="strength-seg"
                          :class="{ 'strength-seg--filled': i <= passwordStrength.score }"
                        />
                      </div>
                      <span v-if="securityForm.newPassword" class="field-hint" :class="'strength-label--' + passwordStrength.level">
                        {{ passwordStrength.label }}
                      </span>
                      <span v-if="securityErrors.newPassword" class="field-error">{{ securityErrors.newPassword }}</span>
                    </div>
                    <div class="field">
                      <label class="field-label" for="s-confirm">Konfirmasi Sandi</label>
                      <div class="pw-wrap">
                        <input
                          id="s-confirm"
                          v-model="securityForm.confirmPassword"
                          :type="showConfirm ? 'text' : 'password'"
                          class="field-input"
                          :class="{ 'field-input--error': securityErrors.confirmPassword }"
                          placeholder="Ketik ulang sandi baru"
                        />
                        <button class="pw-toggle" @click="showConfirm = !showConfirm" type="button" tabindex="-1">
                          <Eye v-if="!showConfirm" size="13" />
                          <EyeOff v-else size="13" />
                        </button>
                      </div>
                      <span v-if="securityErrors.confirmPassword" class="field-error">{{ securityErrors.confirmPassword }}</span>
                    </div>
                  </div>
                </div>

              </div>
              <div class="panel-foot">
                <button class="btn-cancel" @click="resetSecurityForm">Batalkan</button>
                <button class="btn-save" @click="updatePassword" :disabled="isSavingSecurity">
                  <Loader2 v-if="isSavingSecurity" size="12" class="spin" />
                  <ShieldCheck v-else size="12" />
                  {{ isSavingSecurity ? 'Memperbarui...' : 'Perbarui Sandi' }}
                </button>
              </div>
            </div>
          </template>

          <!-- ─── TAB: NOTIFIKASI ─── -->
          <template v-if="activeTab === 'notifications'">
            <div class="panel">
              <div class="panel-head">
                <span class="panel-title">Preferensi Notifikasi</span>
                <span class="panel-hint">Email &amp; In-App</span>
              </div>
              <div class="panel-body" style="padding-bottom: 0">
                <div
                  v-for="item in notifItems"
                  :key="item.key"
                  class="notif-row"
                >
                  <div class="notif-info">
                    <p class="notif-title">{{ item.title }}</p>
                    <p class="notif-desc">{{ item.desc }}</p>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" v-model="notifPrefs[item.key]" />
                    <span class="toggle-track" />
                    <span class="toggle-thumb" />
                  </label>
                </div>
              </div>
              <div class="panel-foot" style="margin-top: 0">
                <button class="btn-save" @click="updateNotifications" :disabled="isSavingNotif">
                  <Loader2 v-if="isSavingNotif" size="12" class="spin" />
                  <Bell v-else size="12" />
                  {{ isSavingNotif ? 'Menyimpan...' : 'Simpan Preferensi' }}
                </button>
              </div>
            </div>
          </template>

        </div>
      </div>

      <!-- Toast -->
      <Transition name="toast">
        <div v-if="toast.visible" class="toast" :class="toast.isError ? 'toast--error' : 'toast--success'">
          <span class="toast-dot" />
          <p class="toast-text">{{ toast.message }}</p>
        </div>
      </Transition>

    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/authStore'
import {
  User, ShieldCheck, Bell, Camera, Check, ArrowUp,
  Loader2, Eye, EyeOff, AlertCircle
} from 'lucide-vue-next'

// ─── Tabs config ──────────────────────────────────────────────
const authStore = useAuthStore()

const activeTab = ref('profile')

const tabs = [
  { id: 'profile',       label: 'Profil Personal',    icon: User },
  { id: 'security',      label: 'Keamanan & Sandi',   icon: ShieldCheck },
  { id: 'notifications', label: 'Notifikasi',          icon: Bell },
]

const joinDate = ref('12 Mar 2024')

// ─── Toast ────────────────────────────────────────────────────
const toast = ref({ visible: false, message: '', isError: false })
let toastTimer = null

function showToast(message, isError = false) {
  clearTimeout(toastTimer)
  toast.value = { visible: true, message, isError }
  toastTimer = setTimeout(() => { toast.value.visible = false }, 3500)
}

// ─── Profile ─────────────────────────────────────────────────
const previewImage = ref(null)
const isSaving = ref(false)

const form = ref({
  nama: '',
  email: '',
  foto: '',
})

const errors = ref({ nama: '', email: '' })

onMounted(() => {
  try {
    const user = JSON.parse(sessionStorage.getItem('pakar_air_user') || '{}')
    form.value.nama  = user.full_name || ''
    form.value.email = user.email     || ''
    joinDate.value   = user.created_at
      ? new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      : joinDate.value
  } catch {}
  form.value.foto = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.value.nama || 'User')}&background=1e40af&color=fff&size=200&bold=true&rounded=false`
})

const selectedFile = ref(null)

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
    showToast('Format gambar harus PNG/JPG/JPEG', true); return
  }
  if (file.size > 2 * 1024 * 1024) {
    showToast('Ukuran gambar maksimal 2MB', true); return
  }
  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => { previewImage.value = e.target.result }
  reader.readAsDataURL(file)
}

function resetForm() {
  errors.value = { nama: '', email: '' }
  previewImage.value = null
  selectedFile.value = null
  form.value.nama = authStore.currentUser?.full_name || ''
}

async function updateProfile() {
  errors.value = { nama: '', email: '' }
  if (form.value.nama.trim().length < 3) {
    errors.value.nama = 'Nama minimal 3 karakter'; return
  }
  isSaving.value = true
  
  try {
    if (form.value.nama !== authStore.currentUser?.full_name) {
      await authStore.updateProfile({ full_name: form.value.nama })
    }
    if (selectedFile.value) {
      await authStore.uploadAvatar(selectedFile.value)
      selectedFile.value = null
    }
    showToast('Profil personal berhasil diperbarui')
  } catch (error) {
    showToast('Gagal memperbarui profil', true)
  } finally {
    isSaving.value = false
  }
}

// ─── Security ─────────────────────────────────────────────────
const isSavingSecurity = ref(false)
const showOld     = ref(false)
const showNew     = ref(false)
const showConfirm = ref(false)

const securityForm = ref({ oldPassword: '', newPassword: '', confirmPassword: '' })
const securityErrors = ref({ oldPassword: '', newPassword: '', confirmPassword: '' })

const passwordStrength = computed(() => {
  const pw = securityForm.value.newPassword
  if (!pw) return { score: 0, level: '', label: '' }
  let score = 0
  if (pw.length >= 8)   score++
  if (pw.length >= 12)  score++
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++
  const levels = ['', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat']
  return { score: Math.max(1, score), level: ['','weak','medium','strong','very-strong'][score] || 'strong', label: levels[score] || 'Sangat Kuat' }
})

function resetSecurityForm() {
  securityForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
  securityErrors.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
}

async function updatePassword() {
  securityErrors.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
  let valid = true
  if (!securityForm.value.oldPassword) {
    securityErrors.value.oldPassword = 'Kata sandi saat ini wajib diisi'; valid = false
  }
  if (securityForm.value.newPassword.length < 8) {
    securityErrors.value.newPassword = 'Minimal 8 karakter'; valid = false
  }
  if (securityForm.value.newPassword !== securityForm.value.confirmPassword) {
    securityErrors.value.confirmPassword = 'Konfirmasi sandi tidak cocok'; valid = false
  }
  if (!valid) return
  
  isSavingSecurity.value = true
  const res = await authStore.changePassword(securityForm.value.newPassword)
  isSavingSecurity.value = false
  
  if (res.success) {
    resetSecurityForm()
    showToast('Kata sandi berhasil diperbarui')
  } else {
    showToast(res.message || 'Gagal memperbarui kata sandi', true)
  }
}

// ─── Notifications ────────────────────────────────────────────
const isSavingNotif = ref(false)

const notifItems = [
  { key: 'analysis',  title: 'Analisis Selesai',        desc: 'Pemberitahuan saat hasil analisis air sudah tersedia.' },
  { key: 'education', title: 'Artikel & Edukasi Baru',  desc: 'Tips dan artikel terbaru seputar kualitas air.' },
  { key: 'updates',   title: 'Pembaruan Sistem',        desc: 'Informasi terkait pemeliharaan dan fitur baru di aplikasi.' },
]

const notifPrefs = ref({ analysis: true, education: false, updates: true })

function updateNotifications() {
  isSavingNotif.value = true
  setTimeout(() => {
    isSavingNotif.value = false
    showToast('Preferensi notifikasi berhasil disimpan')
  }, 800)
}
</script>

<style scoped>
/* ============================================================
   IMPORTS
   ============================================================ */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');

/* ============================================================
   LOCAL TOKENS
   ============================================================ */
.profile-view {
  --mono: 'IBM Plex Mono', ui-monospace, monospace;
  --h-rule: var(--color-border);
  --h-rule-2: var(--color-border-light);

  display: flex;
  flex-direction: column;
  min-height: 100%;
  gap: 24px;
}

/* Screen-reader only */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border-width: 0;
}

/* ============================================================
   HEADER
   ============================================================ */
.workspace-header {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-text-primary);
}

.header-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 6px;
}

.workspace-title {
  font-family: var(--mono);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0 0 6px;
}

.workspace-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

/* ============================================================
   LAYOUT
   ============================================================ */
.settings-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

@media (min-width: 1024px) {
  .settings-layout {
    flex-direction: row;
  }
}

/* ============================================================
   SIDEBAR
   ============================================================ */
.settings-sidebar {
  width: 100%;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .settings-sidebar {
    width: 220px;
    position: sticky;
    top: calc(var(--topbar-height, 60px) + 24px);
  }
}

.sidebar-label {
  display: block;
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 0 12px 8px;
}

.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

@media (min-width: 640px) and (max-width: 1023px) {
  .settings-nav {
    flex-direction: row;
    gap: 4px;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  width: 100%;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 2px;
  font-family: var(--sans, inherit);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  cursor: pointer;
  text-align: left;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}

.nav-item:hover {
  color: var(--color-text-primary);
  background: var(--color-surface);
  border-color: var(--h-rule);
}

.nav-item--active {
  color: var(--color-text-primary);
  background: var(--color-surface);
  border-color: var(--color-text-primary);
  font-weight: 600;
}

.nav-icon { flex-shrink: 0; }

.nav-label { flex: 1; }

.nav-badge {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.06em;
  background: var(--color-text-primary);
  color: var(--color-surface);
  padding: 1px 5px;
  border-radius: 1px;
  flex-shrink: 0;
}

.sidebar-divider {
  border: none;
  border-top: 1px solid var(--h-rule);
  margin: 12px 0;
}

.sidebar-meta {
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-meta-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted-light);
}

.sidebar-meta-value {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

/* ============================================================
   CONTENT
   ============================================================ */
.settings-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

/* ============================================================
   PANEL
   ============================================================ */
.panel {
  background: var(--color-surface);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
}

.panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--h-rule);
  background: var(--color-neutral-bg);
}

.panel-title {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-primary);
}

.panel-hint {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-text-muted);
}

.panel-body {
  padding: 20px;
}

.panel-foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 12px 20px;
  border-top: 1px solid var(--h-rule-2);
  background: var(--color-neutral-bg);
}

/* ============================================================
   AVATAR
   ============================================================ */
.avatar-row {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--h-rule-2);
}

.avatar-wrap {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 2px;
  border: 1px solid var(--h-rule);
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
  color: #fff;
  transition: opacity 0.15s;
}

.avatar-wrap:hover .avatar-overlay {
  opacity: 1;
}

.avatar-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.avatar-name {
  font-family: var(--mono);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.avatar-email {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--color-text-muted);
  margin: 0 0 8px;
}

.btn-upload {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 5px 12px;
  border: 1px solid var(--h-rule);
  background: var(--color-neutral-bg);
  color: var(--color-text-secondary);
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.btn-upload:hover {
  border-color: var(--color-text-primary);
  color: var(--color-text-primary);
}

/* ============================================================
   FORM FIELDS
   ============================================================ */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.field-input {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--h-rule);
  background: var(--color-surface);
  border-radius: 2px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--color-text-primary);
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}

.field-input:focus {
  border-color: var(--color-text-primary);
}

.field-input--error {
  border-color: var(--color-danger);
}

.field-input--disabled,
.field-input:disabled {
  background: var(--color-neutral-bg);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.field-hint {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-text-muted);
}

.field-error {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-danger);
}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn-save {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 7px 16px;
  border: 1px solid var(--color-text-primary);
  background: var(--color-text-primary);
  color: var(--color-surface);
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  transition: opacity 0.15s;
}

.btn-save:hover:not(:disabled) {
  opacity: 0.8;
}

.btn-save:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-cancel {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  padding: 7px 14px;
  border: 1px solid var(--h-rule);
  background: transparent;
  color: var(--color-text-secondary);
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.btn-cancel:hover {
  border-color: var(--color-text-secondary);
  color: var(--color-text-primary);
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ============================================================
   SECURITY
   ============================================================ */
.sec-section {
  margin-bottom: 20px;
}

.sec-section:last-child {
  margin-bottom: 0;
}

.sec-section-label {
  display: block;
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding-bottom: 10px;
  margin-bottom: 14px;
  border-bottom: 1px solid var(--h-rule-2);
}

.pw-wrap {
  position: relative;
}

.pw-wrap .field-input {
  padding-right: 36px;
}

.pw-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.15s;
}

.pw-toggle:hover {
  color: var(--color-text-primary);
}

/* Password strength bar */
.strength-bar {
  display: flex;
  gap: 3px;
  margin-top: 6px;
}

.strength-seg {
  flex: 1;
  height: 2px;
  background: var(--h-rule-2);
  border-radius: 0;
}

.strength-seg--filled {
  background: var(--color-success);
}

.strength-label--weak   { color: var(--color-danger) !important; }
.strength-label--medium { color: var(--color-warning, #b45309) !important; }
.strength-label--strong,
.strength-label--very-strong { color: var(--color-success) !important; }

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
.notif-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--h-rule-2);
}

.notif-row:last-child {
  border-bottom: none;
}

.notif-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-right: 16px;
}

.notif-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0;
}

.notif-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin: 0;
}

/* Square toggle */
.toggle {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
}

.toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  position: absolute;
  inset: 0;
  background: var(--h-rule);
  border-radius: 0;
  transition: background 0.2s;
}

.toggle input:checked ~ .toggle-track {
  background: var(--color-text-primary);
}

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 0;
  pointer-events: none;
  transition: transform 0.2s;
}

.toggle input:checked ~ .toggle-thumb {
  transform: translateX(16px);
}

/* ============================================================
   TOAST
   ============================================================ */
.toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 2px;
  z-index: 1000;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  max-width: 360px;
}

.toast--success {
  background: var(--color-text-primary);
  color: var(--color-surface);
}

.toast--error {
  background: var(--color-danger);
  color: #fff;
}

.toast-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-surface);
  opacity: 0.6;
  flex-shrink: 0;
}

.toast--error .toast-dot {
  background: #fff;
}

.toast-text {
  margin: 0;
  line-height: 1.4;
}

/* Transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
</style>