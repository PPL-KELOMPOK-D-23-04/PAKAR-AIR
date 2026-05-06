<template>
  <DashboardLayout>
    <div class="pv">

      <!-- PAGE HEADER -->
      <div class="pv__header">
        <div>
          <p class="pv__eyebrow">Pengaturan Akun</p>
          <h1 class="pv__title">Profil Saya</h1>
        </div>
        <p class="pv__desc">Kelola informasi pribadi dan keamanan akun Anda</p>
      </div>

      <!-- MAIN GRID -->
      <div class="pv__grid">

        <!-- ── SIDEBAR ── -->
        <aside class="pv__sidebar">

          <div class="card">
            <div class="avatar-block">
              <div class="avatar-ring">
                <img :src="previewFoto || fotoProfil || defaultAvatar" class="avatar__img" alt="Foto profil" />
                <div class="avatar-online"></div>
              </div>
            </div>

            <div class="avatar-info">
              <p class="avatar-name">{{ formData.nama || 'Nama Pengguna' }}</p>
              <p class="avatar-username">@{{ formData.username || 'username' }}</p>
              <span class="avatar-badge">
                <span class="badge-dot"></span>Aktif
              </span>
            </div>

            <div class="avatar-meta">
              <div class="meta-row">
                <span class="meta-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <span class="meta-text">Bergabung {{ joinDate }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <span class="meta-text">{{ formData.email || '—' }}</span>
              </div>
            </div>

            <label class="btn-upload">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
              Ganti Foto
              <input type="file" @change="handleUploadFoto" hidden accept="image/*" />
            </label>
          </div>

          <div class="card side-nav">
            <button
              v-for="tab in tabs" :key="tab.id"
              :class="['nav-item', { 'nav-item--active': activeTab === tab.id }]"
              @click="activeTab = tab.id"
            >
              <span class="nav-item__icon" v-html="tab.icon"></span>
              {{ tab.label }}
              <svg class="nav-item__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

        </aside>

        <!-- ── CONTENT ── -->
        <div class="pv__content">

          <!-- TAB: PROFIL -->
          <div v-show="activeTab === 'profil'" class="card">
            <div class="card__head">
              <div class="card__head-icon card__head-icon--blue">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <h2 class="card__title">Informasi Profil</h2>
                <p class="card__subtitle">Perbarui nama dan username akun Anda</p>
              </div>
            </div>

            <div class="form-grid">
              <div class="field">
                <label class="field__label">Nama Lengkap</label>
                <input v-model="formData.nama" class="field__input" placeholder="Masukkan nama lengkap" />
              </div>
              <div class="field">
                <label class="field__label">Username</label>
                <div class="field__prefix-wrap">
                  <span class="field__prefix">@</span>
                  <input v-model="formData.username" class="field__input field__input--prefix" placeholder="username" />
                </div>
              </div>
              <div class="field field--full">
                <label class="field__label">
                  Email
                  <span class="chip chip--green">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                    Terverifikasi
                  </span>
                </label>
                <input v-model="formData.email" disabled class="field__input field__input--disabled" />
              </div>
            </div>

            <div class="card__foot">
              <span class="foot-hint">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Perubahan akan langsung tersimpan ke akun Anda
              </span>
              <button @click="updateProfil" :class="['btn-primary', { 'btn-primary--loading': isSavingProfil }]">
                <svg v-if="!isSavingProfil" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                <span v-else class="spinner"></span>
                {{ isSavingProfil ? 'Menyimpan…' : 'Simpan Perubahan' }}
              </button>
            </div>
          </div>

          <!-- TAB: KEAMANAN -->
          <div v-show="activeTab === 'keamanan'" class="card">
            <div class="card__head">
              <div class="card__head-icon card__head-icon--amber">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h2 class="card__title">Keamanan Akun</h2>
                <p class="card__subtitle">Kelola password dan keamanan login Anda</p>
              </div>
            </div>

            <div class="security-status">
              <div class="sec-stat">
                <div class="sec-stat__icon sec-stat__icon--green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p class="sec-stat__label">Password</p>
                  <p class="sec-stat__value">Terakhir diubah 3 bulan lalu</p>
                </div>
              </div>
              <div class="sec-stat">
                <div class="sec-stat__icon sec-stat__icon--blue">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <p class="sec-stat__label">Email Verifikasi</p>
                  <p class="sec-stat__value">{{ formData.email || 'Belum diatur' }}</p>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <!-- Password Accordion -->
            <div class="pass-accordion">
              <div class="pass-accordion__trigger" @click="showPasswordForm = !showPasswordForm">
                <div class="pass-accordion__label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Ganti Password
                </div>
                <svg :class="['chevron', { 'chevron--open': showPasswordForm }]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>

              <div :class="['pass-body', { 'pass-body--open': showPasswordForm }]">
                <div class="pass-body__inner">

                  <div class="form-grid">
                    <div class="field field--full">
                      <label class="field__label">Password Saat Ini</label>
                      <div class="field__pass-wrap">
                        <input v-model="passForm.current" :type="showPass.current ? 'text' : 'password'" class="field__input field__input--pass" placeholder="Masukkan password saat ini" />
                        <button class="pass-eye" @click="showPass.current = !showPass.current" type="button">
                          <svg v-if="!showPass.current" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        </button>
                      </div>
                    </div>

                    <div class="field">
                      <label class="field__label">Password Baru</label>
                      <div class="field__pass-wrap">
                        <input v-model="passForm.new" :type="showPass.new ? 'text' : 'password'" class="field__input field__input--pass" placeholder="Minimal 8 karakter" @input="checkStrength" />
                        <button class="pass-eye" @click="showPass.new = !showPass.new" type="button">
                          <svg v-if="!showPass.new" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        </button>
                      </div>
                      <div v-if="passForm.new" class="strength-row">
                        <div class="strength-tracks">
                          <div v-for="i in 4" :key="i" :class="['strength-track', { 'strength-track--on': i <= passStrength.score }]" :style="i <= passStrength.score ? { background: passStrength.color } : {}"></div>
                        </div>
                        <span class="strength-label" :style="{ color: passStrength.color }">{{ passStrength.label }}</span>
                      </div>
                    </div>

                    <div class="field">
                      <label class="field__label">
                        Konfirmasi Password Baru
                        <span v-if="passForm.confirm && passForm.new" :class="['chip', passForm.confirm === passForm.new ? 'chip--green' : 'chip--red']">
                          {{ passForm.confirm === passForm.new ? 'Cocok' : 'Tidak cocok' }}
                        </span>
                      </label>
                      <div class="field__pass-wrap">
                        <input v-model="passForm.confirm" :type="showPass.confirm ? 'text' : 'password'" :class="['field__input', 'field__input--pass', { 'field__input--error': passForm.confirm && passForm.confirm !== passForm.new }]" placeholder="Ulangi password baru" />
                        <button class="pass-eye" @click="showPass.confirm = !showPass.confirm" type="button">
                          <svg v-if="!showPass.confirm" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <ul class="pass-rules">
                    <li :class="['pass-rule', { 'pass-rule--ok': passForm.new.length >= 8 }]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      Minimal 8 karakter
                    </li>
                    <li :class="['pass-rule', { 'pass-rule--ok': /[A-Z]/.test(passForm.new) }]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      Huruf kapital
                    </li>
                    <li :class="['pass-rule', { 'pass-rule--ok': /[0-9]/.test(passForm.new) }]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      Mengandung angka
                    </li>
                    <li :class="['pass-rule', { 'pass-rule--ok': /[^A-Za-z0-9]/.test(passForm.new) }]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                      Karakter spesial (!@#$)
                    </li>
                  </ul>

                  <div class="card__foot">
                    <button class="btn-ghost" @click="resetPassForm">Batal</button>
                    <button @click="updatePassword" :disabled="!canSubmitPass" :class="['btn-primary', { 'btn-primary--loading': isSavingPass }]">
                      <svg v-if="!isSavingPass" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <span v-else class="spinner"></span>
                      {{ isSavingPass ? 'Memperbarui…' : 'Perbarui Password' }}
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- TOAST -->
      <transition name="toast">
        <div v-if="toast.show" :class="['toast', `toast--${toast.type}`]">
          <div :class="['toast__icon', `toast__icon--${toast.type}`]">
            <svg v-if="toast.type === 'success'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
          <div>
            <p class="toast__title">{{ toast.title }}</p>
            <p class="toast__msg">{{ toast.msg }}</p>
          </div>
        </div>
      </transition>

    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const tabs = [
  {
    id: 'profil',
    label: 'Informasi Profil',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
  },
  {
    id: 'keamanan',
    label: 'Keamanan',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  }
]
const activeTab = ref('profil')

const previewFoto  = ref(null)
const fotoProfil   = ref(null)
const isSavingProfil = ref(false)
const isSavingPass   = ref(false)
const showPasswordForm = ref(false)

const defaultAvatar = 'https://ui-avatars.com/api/?background=1c3f6e&color=ffffff&bold=true&size=200'
const joinDate = ref('15 Jan 2025')

const formData = ref({ nama: '', username: '', email: '' })
const passForm = ref({ current: '', new: '', confirm: '' })
const showPass = ref({ current: false, new: false, confirm: false })
const toast = ref({ show: false, type: 'success', title: '', msg: '' })
const passStrength = ref({ score: 0, label: '', color: '' })

onMounted(() => {
  const user = authStore.currentUser
  if (user) {
    formData.value = {
      nama: user.full_name || '',
      username: user.username || '',
      email: user.email || ''
    }
  }
})

const checkStrength = () => {
  const p = passForm.value.new
  let score = 0
  if (p.length >= 8)          score++
  if (/[A-Z]/.test(p))        score++
  if (/[0-9]/.test(p))        score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  const map = [
    { label: 'Sangat Lemah', color: '#ef4444' },
    { label: 'Lemah',        color: '#f97316' },
    { label: 'Cukup',        color: '#eab308' },
    { label: 'Kuat',         color: '#22c55e' },
    { label: 'Sangat Kuat',  color: '#10b981' },
  ]
  passStrength.value = { score, ...map[score] }
}

const canSubmitPass = computed(() =>
  passForm.value.current &&
  passForm.value.new.length >= 8 &&
  passForm.value.new === passForm.value.confirm
)

const handleUploadFoto = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { previewFoto.value = ev.target.result }
  reader.readAsDataURL(file)
}

const showToast = (type, title, msg) => {
  toast.value = { show: true, type, title, msg }
  setTimeout(() => { toast.value.show = false }, 3500)
}

const updateProfil = async () => {
  isSavingProfil.value = true
  await new Promise(r => setTimeout(r, 900))
  isSavingProfil.value = false
  showToast('success', 'Berhasil disimpan', 'Informasi profil Anda telah diperbarui.')
}

const updatePassword = async () => {
  if (!canSubmitPass.value) return
  isSavingPass.value = true
  await new Promise(r => setTimeout(r, 1100))
  isSavingPass.value = false
  resetPassForm()
  showToast('success', 'Password diperbarui', 'Password baru Anda sudah aktif sekarang.')
}

const resetPassForm = () => {
  passForm.value  = { current: '', new: '', confirm: '' }
  showPass.value  = { current: false, new: false, confirm: false }
  passStrength.value = { score: 0, label: '', color: '' }
  showPasswordForm.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fraunces:ital,wght@0,700;1,600&display=swap');

/* ══ TOKENS ══ */
.pv {
  --c-bg:       #f6f5f2;
  --c-surface:  #ffffff;
  --c-border:   #e8e6e1;
  --c-text:     #1a1916;
  --c-muted:    #78716c;
  --c-accent:   #1c3f6e;
  --c-accentlt: #dbeafe;
  --c-green:    #16a34a;
  --c-greenlt:  #dcfce7;
  --c-amber:    #d97706;
  --c-amberlt:  #fef3c7;
  --c-red:      #dc2626;
  --r:          14px;

  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--c-text);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ══ HEADER ══ */
.pv__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--c-border);
}

.pv__eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--c-accent);
  margin-bottom: 4px;
}

.pv__title {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  color: var(--c-text);
}

.pv__desc {
  font-size: 13px;
  color: var(--c-muted);
  text-align: right;
  line-height: 1.5;
  max-width: 240px;
}

/* ══ LAYOUT ══ */
.pv__grid {
  display: grid;
  grid-template-columns: 248px 1fr;
  gap: 20px;
  align-items: start;
}

.pv__sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: sticky;
  top: 24px;
}

.pv__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

/* ══ CARD ══ */
.card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--r);
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 3px 10px rgba(0,0,0,.05);
}

/* ── Avatar ── */
.avatar-block {
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
}

.avatar-ring {
  position: relative;
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(145deg, #1c3f6e, #3b82f6);
}

.avatar__img {
  display: block;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  border: 3px solid var(--c-surface);
  object-fit: cover;
}

.avatar-online {
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 11px;
  height: 11px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid var(--c-surface);
}

.avatar-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 14px;
}

.avatar-name {
  font-family: 'Fraunces', serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--c-text);
}

.avatar-username {
  font-size: 12px;
  color: var(--c-muted);
}

.avatar-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: var(--c-green);
  background: var(--c-greenlt);
  border: 1px solid #bbf7d0;
  padding: 2px 10px;
  border-radius: 99px;
}

.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--c-green);
}

.avatar-meta {
  background: #fafaf9;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 14px;
}

.meta-row { display: flex; align-items: center; gap: 8px; }
.meta-icon { color: var(--c-muted); display: flex; flex-shrink: 0; }
.meta-text { font-size: 11.5px; color: var(--c-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.btn-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 9px;
  border: 1.5px dashed var(--c-border);
  border-radius: 9px;
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-muted);
  cursor: pointer;
  transition: all .15s;
  box-sizing: border-box;
}

.btn-upload:hover {
  border-color: var(--c-accent);
  color: var(--c-accent);
  background: var(--c-accentlt);
}

/* ── Side Nav ── */
.side-nav {
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 500;
  color: var(--c-muted);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all .15s;
  border: none;
}

.nav-item:hover { background: #f5f4f1; color: var(--c-text); }
.nav-item--active { background: var(--c-accentlt); color: var(--c-accent); }
.nav-item__icon { display: flex; color: inherit; }
.nav-item__arrow { margin-left: auto; opacity: .4; }
.nav-item--active .nav-item__arrow { opacity: 1; }

/* ── Card Head/Foot ── */
.card__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--c-border);
  margin-bottom: 20px;
}

.card__head-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card__head-icon--blue  { background: var(--c-accentlt); color: var(--c-accent); }
.card__head-icon--amber { background: var(--c-amberlt);  color: var(--c-amber); }

.card__title {
  font-family: 'Fraunces', serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 2px;
}

.card__subtitle {
  font-size: 12px;
  color: var(--c-muted);
  margin: 0;
}

.card__foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 18px;
  border-top: 1px solid var(--c-border);
  margin-top: 20px;
}

.foot-hint {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: var(--c-muted);
  margin-right: auto;
}

/* ══ FORM ══ */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field { display: flex; flex-direction: column; gap: 6px; }
.field--full { grid-column: 1 / -1; }

.field__label {
  font-size: 12px;
  font-weight: 600;
  color: #52525b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.field__prefix-wrap { position: relative; }
.field__prefix {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 13px;
  color: var(--c-muted);
  pointer-events: none;
}
.field__input--prefix { padding-left: 28px !important; }

.field__pass-wrap { position: relative; }
.field__input--pass { padding-right: 42px; }

.pass-eye {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--c-muted);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color .15s;
}
.pass-eye:hover { color: var(--c-text); }

.field__input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--c-border);
  font-size: 13.5px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--c-text);
  background: var(--c-surface);
  transition: border-color .15s, box-shadow .15s;
  box-sizing: border-box;
}

.field__input:focus {
  outline: none;
  border-color: var(--c-accent);
  box-shadow: 0 0 0 3px rgba(28,63,110,.1);
}

.field__input--disabled {
  background: #fafaf9;
  color: #a8a29e;
  cursor: not-allowed;
}

.field__input--error {
  border-color: var(--c-red);
  box-shadow: 0 0 0 3px rgba(220,38,38,.08);
}

/* ── Chips ── */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 99px;
  letter-spacing: .03em;
}
.chip--green { color: var(--c-green); background: var(--c-greenlt); border: 1px solid #bbf7d0; }
.chip--red   { color: var(--c-red);   background: #fee2e2;          border: 1px solid #fca5a5; }

/* ══ SECURITY STATUS ══ */
.security-status {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.sec-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #fafaf9;
  border: 1px solid var(--c-border);
  border-radius: 10px;
}

.sec-stat__icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sec-stat__icon--green { background: var(--c-greenlt); color: var(--c-green); }
.sec-stat__icon--blue  { background: var(--c-accentlt); color: var(--c-accent); }

.sec-stat__label { font-size: 11px; color: var(--c-muted); font-weight: 600; margin-bottom: 2px; }
.sec-stat__value { font-size: 12.5px; color: var(--c-text); font-weight: 500; }

.divider { height: 1px; background: var(--c-border); margin: 0 0 20px; }

/* ══ PASSWORD ACCORDION ══ */
.pass-accordion {
  border: 1.5px solid var(--c-border);
  border-radius: 12px;
  overflow: hidden;
}

.pass-accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
  background: #fafaf9;
  user-select: none;
  transition: background .15s;
}

.pass-accordion__trigger:hover { background: #f4f3ef; }

.pass-accordion__label {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--c-text);
}

.chevron { transition: transform .25s ease; color: var(--c-muted); }
.chevron--open { transform: rotate(180deg); }

.pass-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .3s ease;
}

.pass-body--open { grid-template-rows: 1fr; }

.pass-body__inner {
  overflow: hidden;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pass-body--open .pass-body__inner { padding: 16px; }

/* ── Strength ── */
.strength-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.strength-tracks {
  display: flex;
  gap: 4px;
  flex: 1;
}

.strength-track {
  height: 4px;
  flex: 1;
  border-radius: 99px;
  background: var(--c-border);
  transition: background .3s;
}

.strength-label {
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

/* ── Pass Rules ── */
.pass-rules {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px 16px;
}

.pass-rule {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: #a8a29e;
  transition: color .2s;
}

.pass-rule svg { opacity: .3; transition: opacity .2s; }
.pass-rule--ok { color: var(--c-green); }
.pass-rule--ok svg { opacity: 1; color: var(--c-green); }

/* ══ BUTTONS ══ */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  background: var(--c-text);
  color: #fff;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  cursor: pointer;
  transition: all .15s;
  border: 1.5px solid var(--c-text);
  white-space: nowrap;
}

.btn-primary:hover:not(:disabled) {
  background: #000;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0,0,0,.2);
}

.btn-primary:disabled { opacity: .4; cursor: not-allowed; }
.btn-primary--loading { opacity: .7; pointer-events: none; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 1.5px solid var(--c-border);
  background: var(--c-surface);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--c-muted);
  cursor: pointer;
  transition: all .15s;
}

.btn-ghost:hover { background: #f5f4f1; color: var(--c-text); }

.spinner {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
  display: block;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ══ TOAST ══ */
.toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  box-shadow: 0 8px 28px rgba(0,0,0,.14);
  z-index: 9999;
  max-width: 300px;
  background: #1a1916;
  color: #fff;
}

.toast__icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.toast__icon--success { background: #22c55e; }
.toast__icon--error   { background: var(--c-red); }

.toast__title { font-size: 13px; font-weight: 700; margin: 0 0 2px; }
.toast__msg   { font-size: 12px; opacity: .7; margin: 0; }

.toast-enter-active, .toast-leave-active { transition: all .3s cubic-bezier(.34,1.56,.64,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(14px) scale(.95); }

/* ══ RESPONSIVE ══ */
@media (max-width: 820px) {
  .pv__header { flex-direction: column; align-items: flex-start; }
  .pv__desc   { text-align: left; max-width: 100%; }
  .pv__grid   { grid-template-columns: 1fr; }
  .pv__sidebar { position: static; }

  .form-grid { grid-template-columns: 1fr; }
  .field--full { grid-column: 1; }
  .security-status { grid-template-columns: 1fr; }
  .pass-rules { grid-template-columns: 1fr; }

  .card__foot { flex-wrap: wrap; }
  .foot-hint  { width: 100%; }
  .btn-primary { width: 100%; justify-content: center; }

  .toast { left: 16px; right: 16px; bottom: 16px; max-width: none; }
}
</style>