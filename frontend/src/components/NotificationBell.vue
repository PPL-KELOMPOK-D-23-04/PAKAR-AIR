<template>
  <div class="pakar-notification">
    <!-- Tombol Notifikasi -->
    <button class="notif-button" @click="toggleDropdown" ref="buttonRef">
      <svg class="bell-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="unreadTotal > 0" class="badge">{{ unreadTotal > 99 ? '99+' : unreadTotal }}</span>
    </button>

    <!-- Dropdown Notifikasi -->
    <div v-if="isOpen" class="notif-dropdown" ref="dropdownRef">
      <!-- Header -->
      <div class="dropdown-header">
        <span class="header-title">Notifikasi</span>
        <button v-if="unreadTotal > 0" class="header-action" @click="markAllAsRead">
          Tandai semua
        </button>
      </div>

      <!-- Body -->
      <div class="dropdown-body">
        <!-- Loading -->
        <div v-if="loading" class="empty-loading">
          <div class="loading-dot"></div>
          <p>Memuat...</p>
        </div>

        <!-- Kosong -->
        <div v-else-if="notifications.length === 0" class="empty-loading">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <p>Tidak ada notifikasi</p>
        </div>

        <!-- Daftar Notifikasi -->
        <div v-else class="notif-list">
          <div
            v-for="item in notifications"
            :key="item.id"
            :class="['notif-item', { 'is-unread': !item.is_read }]"
            @click="handleClick(item)"
          >
            <div class="item-indicator" :class="`indicator-${item.type}`"></div>
            <div class="item-content">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-message">{{ item.message }}</div>
              <div class="item-time">{{ formatRelativeTime(item.created_at) }}</div>
            </div>
            <div v-if="item.action_link" class="item-chevron">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="notifications.length > 0" class="dropdown-footer">
        <router-link to="/notifications" class="footer-link" @click="isOpen = false">
          Lihat semua notifikasi
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ============ DATA ============
const isOpen = ref(false)
const loading = ref(false)
const notifications = ref([])
const buttonRef = ref(null)
const dropdownRef = ref(null)
let pollingTimer = null

// Ambil user dari localStorage (sesuaikan dengan auth Anda)
const currentUser = ref(null)
const userId = ref(null)

// ============ COMPUTED ============
const unreadTotal = computed(() => {
  return notifications.value.filter(n => !n.is_read).length
})

// ============ MOCK DATA (HAPUS INI setelah terhubung ke API) ============
// Data contoh untuk testing, ganti dengan fetch API sesungguhnya
const mockNotifications = [
  {
    id: 1,
    title: 'Analisis Selesai',
    message: 'Hasil analisis kualitas air dari sumber Sumur telah tersedia.',
    type: 'hasil_analisis',
    is_read: false,
    created_at: new Date().toISOString(),
    action_link: '/history/1'
  },
  {
    id: 2,
    title: 'Artikel Edukasi Baru',
    message: 'Parameter kualitas air yang perlu Anda ketahui untuk keluarga sehat.',
    type: 'edukasi',
    is_read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    action_link: '/edukasi/parameter-air'
  },
  {
    id: 3,
    title: 'Mulai Analisis Pertama Anda',
    message: 'Belum pernah cek kualitas air? Lakukan analisis sekarang.',
    type: 'pengingat',
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    action_link: '/analysis'
  },
  {
    id: 4,
    title: 'Profil Diperbarui',
    message: 'Informasi akun Anda berhasil diubah.',
    type: 'profil',
    is_read: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    action_link: '/profile'
  },
  {
    id: 5,
    title: 'Peringatan Admin',
    message: 'Akun Anda akan dinonaktifkan jika tidak melakukan verifikasi.',
    type: 'admin_action',
    is_read: false,
    created_at: new Date(Date.now() - 300000).toISOString(),
    action_link: '/support'
  }
]

// ============ FUNGSI ============

// Ambil data dari localStorage (sesuaikan dengan auth system Anda)
const loadUser = () => {
  try {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      currentUser.value = JSON.parse(userStr)
      userId.value = currentUser.value?.user_id || currentUser.value?.id || 1
    } else {
      // Untuk testing, gunakan user_id = 1
      userId.value = 1
    }
  } catch (e) {
    userId.value = 1
  }
}

// Fetch notifikasi dari API (ganti dengan endpoint real Anda)
const fetchNotifications = async () => {
  loading.value = true
  
  // TODO: Ganti dengan API call sesungguhnya
  // Contoh API call:
  // try {
  //   const response = await fetch(`/api/notifications/user/${userId.value}?limit=5`)
  //   const data = await response.json()
  //   notifications.value = data
  // } catch (error) {
  //   console.error('Gagal fetch notifikasi:', error)
  //   // Fallback ke mock data
  //   notifications.value = mockNotifications
  // }
  
  // SEMENTARA: Gunakan mock data untuk testing
  setTimeout(() => {
    notifications.value = mockNotifications
    loading.value = false
  }, 500)
}

// Tandai satu notifikasi sebagai sudah dibaca
const markAsRead = async (notifId) => {
  const item = notifications.value.find(n => n.id === notifId)
  if (!item || item.is_read) return
  
  // TODO: Panggil API
  // await fetch(`/api/notifications/${notifId}/read`, { method: 'PATCH' })
  
  item.is_read = true
}

// Tandai semua sebagai sudah dibaca
const markAllAsRead = async () => {
  // TODO: Panggil API
  // await fetch(`/api/notifications/mark-all-read/${userId.value}`, { method: 'PATCH' })
  
  notifications.value.forEach(n => {
    n.is_read = true
  })
}

// Handle klik pada notifikasi
const handleClick = async (item) => {
  await markAsRead(item.id)
  if (item.action_link) {
    router.push(item.action_link)
  }
  isOpen.value = false
}

// Format waktu relatif (baru saja, X menit lalu, X jam lalu, kemarin, X hari lalu)
const formatRelativeTime = (timestamp) => {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays === 1) return 'Kemarin'
  return `${diffDays} hari lalu`
}

// Toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && notifications.value.length === 0) {
    fetchNotifications()
  }
}

// Klik di luar dropdown untuk menutup
const handleClickOutside = (event) => {
  if (!isOpen.value) return
  const isClickButton = buttonRef.value && buttonRef.value.contains(event.target)
  const isClickDropdown = dropdownRef.value && dropdownRef.value.contains(event.target)
  if (!isClickButton && !isClickDropdown) {
    isOpen.value = false
  }
}

// Polling untuk notifikasi real-time (setiap 30 detik)
const startPolling = () => {
  pollingTimer = setInterval(() => {
    if (!document.hidden && !isOpen.value) {
      fetchNotifications()
    }
  }, 30000)
}

// Lifecycle
onMounted(() => {
  loadUser()
  document.addEventListener('click', handleClickOutside)
  startPolling()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (pollingTimer) clearInterval(pollingTimer)
})
</script>

<style scoped>
/* ============================================ */
/* PAKAR-AIR NOTIFICATION STYLE - ELEGANT & PRO */
/* ============================================ */

.pakar-notification {
  position: relative;
  display: inline-block;
}

/* ---------- TOMBOL NOTIFIKASI ---------- */
.notif-button {
  position: relative;
  background: transparent;
  border: none;
  padding: 8px 10px;
  border-radius: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #475569;
}

.notif-button:hover {
  background-color: #f1f5f9;
  color: #1e4a6e;
}

.bell-icon {
  width: 22px;
  height: 22px;
  stroke: currentColor;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #dc2626;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 20px;
  line-height: 1.2;
  min-width: 18px;
  text-align: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* ---------- DROPDOWN ---------- */
.notif-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 380px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03);
  z-index: 1000;
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---------- HEADER ---------- */
.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eef2f5;
}

.header-title {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  letter-spacing: -0.2px;
}

.header-action {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  color: #2c7da0;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 20px;
  transition: background 0.2s;
}

.header-action:hover {
  background-color: #eef2ff;
}

/* ---------- BODY ---------- */
.dropdown-body {
  max-height: 420px;
  overflow-y: auto;
}

/* Loading & Empty State */
.empty-loading {
  padding: 48px 20px;
  text-align: center;
  color: #94a3b8;
}

.loading-dot {
  width: 28px;
  height: 28px;
  margin: 0 auto 12px;
  border: 2px solid #e2e8f0;
  border-top-color: #2c7da0;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-loading p {
  font-size: 13px;
  margin-top: 8px;
}

/* Daftar Notifikasi */
.notif-list {
  padding: 4px 0;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 20px;
  cursor: pointer;
  transition: background 0.15s ease;
  border-left: 3px solid transparent;
}

.notif-item:hover {
  background-color: #fafcff;
}

.notif-item.is-unread {
  background-color: #f5faff;
  border-left-color: #2c7da0;
}

/* Indikator Warna per Tipe */
.item-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.indicator-hasil_analisis {
  background-color: #10b981;
}

.indicator-edukasi {
  background-color: #3b82f6;
}

.indicator-pengingat {
  background-color: #f59e0b;
}

.indicator-profil {
  background-color: #8b5cf6;
}

.indicator-admin_action {
  background-color: #ef4444;
}

/* Konten Notifikasi */
.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
  line-height: 1.4;
}

.item-message {
  font-size: 12px;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-time {
  font-size: 10px;
  color: #94a3b8;
  letter-spacing: 0.2px;
}

.item-chevron {
  color: #94a3b8;
  margin-top: 4px;
  flex-shrink: 0;
  transition: transform 0.2s, color 0.2s;
}

.notif-item:hover .item-chevron {
  color: #2c7da0;
  transform: translateX(2px);
}

/* ---------- FOOTER ---------- */
.dropdown-footer {
  padding: 12px 20px;
  border-top: 1px solid #eef2f5;
  text-align: center;
}

.footer-link {
  font-size: 12px;
  font-weight: 500;
  color: #2c7da0;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #1b5a7a;
  text-decoration: underline;
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 480px) {
  .notif-dropdown {
    width: calc(100vw - 32px);
    right: -16px;
  }
}
</style>