<template>
  <div class="dashboard">

    <!-- SIDEBAR (fixed) -->
    <aside class="sidebar">
      <div class="sidebar__logo">
        <span class="sidebar__logo-mark">PAKAR-AIR</span>
        <span class="sidebar__logo-sub">Deteksi Kualitas Air</span>
      </div>

      <hr class="sidebar__divider" />

      <nav class="sidebar__nav">
        <router-link to="/dashboard" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </router-link>

        <router-link to="/analysis" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Analisis Baru
        </router-link>

        <router-link to="/history" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Riwayat
        </router-link>

        <router-link to="/education" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Edukasi
        </router-link>

        <router-link to="/profile" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profil
        </router-link>
      </nav>

      <hr class="sidebar__divider sidebar__divider--bottom" />

      <button class="sidebar__item sidebar__item--logout" @click="handleLogout">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Keluar
      </button>
    </aside>

    <!-- RIGHT AREA -->
    <div class="layout-right">

      <!-- TOPBAR (fixed) -->
      <header class="topbar">
        <div class="topbar__breadcrumb">
          <span>Dashboard</span>
        </div>

        <div class="topbar__right">
          <!-- NOTIFICATION BELL COMPONENT -->
          <NotificationBell />

          <!-- PROFILE DROPDOWN -->
          <div class="topbar__profile" @click="toggleProfileDropdown">
            <div class="topbar__avatar">
              <img 
                v-if="profileAvatar" 
                :src="profileAvatar" 
                :alt="userName"
                class="avatar-img"
              />
              <span v-else>{{ userInitial }}</span>
            </div>
            <div class="topbar__user-info">
              <span class="topbar__user-name">{{ userName }}</span>
              <span class="topbar__user-role">{{ userRole }}</span>
            </div>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </header>

      <!-- CONTENT (scrolls only here) -->
      <main class="layout-content">
        <router-view />
      </main>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import NotificationBell from '@/components/NotificationBell.vue'
import { useAuthStore } from '@/stores/authStore'
import { useProfileStore } from '@/stores/profileStore'

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

// State untuk dropdown profile
const showDropdown = ref(false)

// Data user dari auth store
const user = computed(() => authStore.user || {})

// Nama user
const userName = computed(() => {
  return user.value?.full_name || user.value?.fullname || user.value?.nama || user.value?.email?.split('@')[0] || 'Pengguna'
})

// Role user
const userRole = computed(() => {
  return user.value?.role === 'admin' || user.value?.is_admin ? 'Administrator' : 'Pengguna'
})

// Initial untuk avatar (fallback)
const userInitial = computed(() => {
  const name = userName.value
  return name.charAt(0).toUpperCase()
})

// Avatar dari profile store
const profileAvatar = computed(() => {
  return profileStore.profile?.avatar_url || null
})

// Fungsi logout
async function handleLogout() {
  const token = localStorage.getItem('pakar_air_token') || localStorage.getItem('token')
  try {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
    await axios.post(`${API_BASE}/api/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch { }
  
  // Clear storage
  localStorage.removeItem('token')
  localStorage.removeItem('pakar_air_token')
  localStorage.removeItem('pakar_air_refresh_token')
  localStorage.removeItem('pakar_air_user')
  localStorage.removeItem('user')
  
  delete axios.defaults.headers.common['Authorization']
  
  // Reset stores
  authStore.logout?.()
  
  router.push('/login')
}

// Toggle profile dropdown (opsional, bisa ditambah menu dropdown)
function toggleProfileDropdown() {
  // Bisa diisi dengan dropdown menu profile
  // Contoh: redirect ke profile
  router.push('/profile')
}

// Load profile data untuk avatar
const loadProfileData = async () => {
  const userId = user.value?.user_id || user.value?.id
  if (userId && profileStore.profile === null) {
    try {
      await profileStore.fetchProfile(userId)
    } catch (err) {
      console.error('Gagal load profile:', err)
    }
  }
}

// Watch user change
watch(user, () => {
  loadProfileData()
}, { immediate: true })

onMounted(() => {
  loadProfileData()
})
</script>

<style scoped>
/* ── Root ── */
.dashboard {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--color-bg, #f3f6fb);
}

/* ── Sidebar ── */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: #ffffff;
  border-right: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 200;
}

.sidebar__logo {
  padding: 0 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__logo-mark {
  font-size: 15px;
  font-weight: 700;
  color: #1a202c;
  letter-spacing: 0.3px;
}

.sidebar__logo-sub {
  font-size: 11px;
  color: #a0aec0;
}

.sidebar__divider {
  border: none;
  border-top: 1px solid var(--color-border, #e2e8f0);
  margin: 0 0 12px;
}

.sidebar__divider--bottom {
  margin-top: auto;
  margin-bottom: 12px;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 10px;
  flex: 1;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #4a5568;
  text-decoration: none;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  transition: background 0.12s, color 0.12s;
  cursor: pointer;
}

.sidebar__item:hover {
  background: #f1f5f9;
  color: #1a202c;
}

.sidebar__item.router-link-active {
  background: #eff6ff;
  color: #2563eb;
}

.sidebar__item.router-link-active svg {
  color: #2563eb;
}

.sidebar__item--logout {
  margin: 0 10px;
  color: #718096;
}

.sidebar__item--logout:hover {
  background: #fff5f5;
  color: #c53030;
}

/* ── Right area ── */
.layout-right {
  flex: 1;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  min-width: 0;
}

/* ── Topbar ── */
.topbar {
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #718096;
}

.topbar__breadcrumb--active {
  color: #1a202c;
  font-weight: 500;
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.topbar__profile {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 40px;
  transition: background 0.12s;
}

.topbar__profile:hover {
  background: #f7fafc;
}

.topbar__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topbar__user-info {
  display: flex;
  flex-direction: column;
}

.topbar__user-name {
  font-size: 13px;
  font-weight: 600;
  color: #1a202c;
  line-height: 1.3;
}

.topbar__user-role {
  font-size: 10px;
  color: #a0aec0;
  line-height: 1.2;
}

/* ── Content ── */
.layout-content {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
  background: var(--color-bg, #f3f6fb);
  min-height: 0;
}

/* Scrollbar styling */
.layout-content::-webkit-scrollbar {
  width: 6px;
}
.layout-content::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 10px;
}
.layout-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.layout-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }
  .sidebar__logo-mark,
  .sidebar__logo-sub,
  .sidebar__item span {
    display: none;
  }
  .sidebar__item {
    justify-content: center;
    padding: 10px;
  }
  .layout-right {
    margin-left: 70px;
  }
  .topbar__user-info {
    display: none;
  }
  .topbar {
    padding: 0 16px;
  }
  .layout-content {
    padding: 20px;
  }
}
</style>