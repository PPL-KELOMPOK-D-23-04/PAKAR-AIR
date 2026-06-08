<template>
  <div class="dashboard">

    <!-- Mobile Header -->
    <header class="mobile-header">
      <div class="mobile-header__logo">
        <div class="mobile-header__logo-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>
          </svg>
        </div>
        <span class="mobile-header__logo-mark">PAKAR<span>AIR</span></span>
      </div>
      <button class="hamburger-btn" @click="isMobileMenuOpen = true" aria-label="Buka Menu">
        <span class="hamburger-btn__line"></span>
        <span class="hamburger-btn__line"></span>
        <span class="hamburger-btn__line hamburger-btn__line--short"></span>
      </button>
    </header>

    <!-- Sidebar Overlay for Mobile -->
    <div
      class="sidebar-overlay"
      :class="{ 'sidebar-overlay--open': isMobileMenuOpen }"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ 'sidebar--open': isMobileMenuOpen }">

      <!-- Sidebar noise texture -->
      <div class="sidebar__texture" aria-hidden="true"></div>

      <!-- Logo area -->
      <div class="sidebar__logo">
        <div class="sidebar__logo-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 100 20A10 10 0 0012 2z" opacity=".4"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6c-1.5 2-3 4.5-3 6.5a3 3 0 006 0C15 10.5 13.5 8 12 6z"/>
          </svg>
        </div>
        <div class="sidebar__logo-text">
          <span class="sidebar__logo-mark">PAKAR<span class="sidebar__logo-accent">AIR</span></span>
          <span class="sidebar__logo-sub">Deteksi Kualitas Air</span>
        </div>
      </div>



      <div class="sidebar__section-label">{{ isAdmin ? 'Menu Admin' : 'Menu Utama' }}</div>

      <!-- Nav -->
      <nav class="sidebar__nav" @click="isMobileMenuOpen = false">

        <!-- User Sidebar -->
        <template v-if="!isAdmin">

        <router-link to="/dashboard" class="sidebar__item" active-class="sidebar__item--active">
          <span class="sidebar__item-icon">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </span>
          <span class="sidebar__item-label">Dashboard</span>
          <span class="sidebar__item-pip" aria-hidden="true"></span>
        </router-link>

        <router-link to="/analysis" class="sidebar__item" active-class="sidebar__item--active">
          <span class="sidebar__item-icon">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </span>
          <span class="sidebar__item-label">Analisis Baru</span>
          <span class="sidebar__item-pip" aria-hidden="true"></span>
        </router-link>

        <router-link to="/history" class="sidebar__item" active-class="sidebar__item--active">
          <span class="sidebar__item-icon">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span class="sidebar__item-label">Riwayat</span>
          <span class="sidebar__item-pip" aria-hidden="true"></span>
        </router-link>

        <router-link to="/education" class="sidebar__item" active-class="sidebar__item--active">
          <span class="sidebar__item-icon">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
          <span class="sidebar__item-label">Edukasi</span>
          <span class="sidebar__item-pip" aria-hidden="true"></span>
        </router-link>

        <router-link to="/profile" class="sidebar__item" active-class="sidebar__item--active">
          <span class="sidebar__item-icon">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span class="sidebar__item-label">Profil</span>
          <span class="sidebar__item-pip" aria-hidden="true"></span>
        </router-link>
        </template>

        <!-- Admin Sidebar -->
        <template v-else>
          <router-link to="/admin" class="sidebar__item" exact-active-class="sidebar__item--active">
            <span class="sidebar__item-icon">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
            <span class="sidebar__item-label">Dashboard</span>
            <span class="sidebar__item-pip" aria-hidden="true"></span>
          </router-link>

          <router-link to="/admin/users" class="sidebar__item" active-class="sidebar__item--active">
            <span class="sidebar__item-icon">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <span class="sidebar__item-label">Kelola Pengguna</span>
            <span class="sidebar__item-pip" aria-hidden="true"></span>
          </router-link>

          <router-link to="/admin/reports" class="sidebar__item" active-class="sidebar__item--active">
            <span class="sidebar__item-icon">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <span class="sidebar__item-label">Laporan</span>
            <span class="sidebar__item-pip" aria-hidden="true"></span>
          </router-link>

          <router-link to="/admin/chatbot" class="sidebar__item" active-class="sidebar__item--active">
            <span class="sidebar__item-icon">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </span>
            <span class="sidebar__item-label">AI Chatbot</span>
            <span class="sidebar__item-pip" aria-hidden="true"></span>
          </router-link>
        </template>

      </nav>

      <!-- Bottom area -->
      <div class="sidebar__bottom">
        <!-- Version info -->
        <div class="sidebar__version" :class="{ 'sidebar__version--error': !systemIsActive }">
          <span class="sidebar__version-dot" :style="{ backgroundColor: systemIsActive ? 'var(--sb-accent)' : '#ef4444' }"></span>
          <span>{{ systemStatus }}</span>
        </div>

        <button class="sidebar__logout" @click="handleLogout">
          <span class="sidebar__item-icon">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </span>
          <span>Keluar</span>
        </button>
      </div>

    </aside>

    <!-- Main -->
    <div class="main-wrapper">

      <!-- Topbar -->
      <header class="topbar">
        <!-- Breadcrumb -->
        <div class="topbar__breadcrumb">
          <span class="topbar__breadcrumb-root">{{ isAdmin ? 'Admin' : 'Aplikasi' }}</span>
          <svg class="topbar__breadcrumb-sep" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="topbar__breadcrumb-current">{{ currentPageTitle }}</span>
        </div>

        <!-- Right actions -->
        <div class="topbar__right">

          <!-- Notifications (only for regular users) -->
          <router-link v-if="!isAdmin" to="/notifications" class="topbar__icon-btn" aria-label="Notifikasi">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="topbar__notif-badge" v-if="unreadCount > 0" aria-label="Notifikasi baru">
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </router-link>

          <!-- Divider -->
          <div class="topbar__divider" aria-hidden="true"></div>

          <!-- Profile Dropdown Wrapper -->
          <div class="topbar__profile-wrapper">
            <button class="topbar__profile" :class="{ 'topbar__profile--active': isProfileDropdownOpen }" @click="isProfileDropdownOpen = !isProfileDropdownOpen">
              <div class="topbar__avatar">
                <img v-if="userAvatar" :src="userAvatar" alt="Foto profil" class="topbar__avatar-img" />
                <span v-else>{{ userInitial }}</span>
              </div>
              <div class="topbar__user-info">
                <span class="topbar__user-name">{{ userName }}</span>
                <span class="topbar__user-role">{{ userRole || 'Pengguna' }}</span>
              </div>
              <svg class="topbar__chevron" :class="{ 'topbar__chevron--open': isProfileDropdownOpen }" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div v-if="isProfileDropdownOpen" class="profile-dropdown">
              <div class="profile-dropdown__header">
                <div class="profile-dropdown__name">{{ userName }}</div>
                <div class="profile-dropdown__email">{{ user?.email || 'Tidak ada email' }}</div>
              </div>
              <div class="profile-dropdown__divider"></div>
              <router-link to="/profile" class="profile-dropdown__item" @click="isProfileDropdownOpen = false">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Pengaturan Profil
              </router-link>
              <button class="profile-dropdown__item profile-dropdown__item--danger" @click="handleLogout">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Keluar Aplikasi
              </button>
            </div>
            
            <!-- Click Outside Overlay -->
            <div v-if="isProfileDropdownOpen" class="profile-dropdown-overlay" @click="isProfileDropdownOpen = false"></div>
          </div>

        </div>
      </header>

      <!-- Page Content -->
      <main class="main-content">
        <slot />
        <router-view />
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const isMobileMenuOpen = ref(false)
const isProfileDropdownOpen = ref(false)

const routeMap = {
  '/dashboard': 'Ringkasan Kualitas Air',
  '/analysis': 'Analisis Kualitas Air',
  '/history': 'Riwayat Analisis',
  '/education': 'Pusat Edukasi',
  '/profile': 'Pengaturan Profil',
  '/artikel': 'Membaca Artikel Edukasi',
  '/artikel2': 'Membaca Artikel Edukasi',
  '/artikel3': 'Membaca Artikel Edukasi',
  '/admin': 'Ringkasan Sistem',
  '/admin/users': 'Kelola Pengguna',
  '/admin/reports': 'Laporan',
  '/admin/chatbot': 'AI Chatbot'
}

const currentPageTitle = computed(() => {
  if (route.name === 'history-detail') return 'Detail Riwayat'
  return routeMap[route.path] || 'PAKAR-AIR'
})

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

const user = computed(() => authStore.currentUser || {})
const isAdmin = computed(() => !!user.value?.is_admin)
const userName = computed(() => {
  const u = user.value
  return u?.full_name || u?.username || (u?.email ? u.email.split('@')[0] : 'Pengguna')
})
const userRole = computed(() => {
  const u = user.value
  if (!u || Object.keys(u).length === 0) return ''
  return u.is_admin ? 'Administrator' : 'Pengguna Biasa'
})
const userInitial = computed(() => {
  const name = userName.value || 'P'
  return name.charAt(0).toUpperCase()
})
const userAvatar = computed(() => user.value?.avatar_url)
const unreadCount = computed(() => notificationStore.unreadCount || 0)

// ─── System Health Check ──────────────────────────────────────────────
const systemStatus = ref('Memeriksa Sistem...')
const systemIsActive = ref(true)
let healthCheckInterval = null

async function checkSystemHealth() {
  try {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
    await axios.get(`${API_BASE}/`, { timeout: 2000 })
    systemIsActive.value = true
    systemStatus.value = 'Sistem Aktif - 0 kendala'
  } catch (err) {
    systemIsActive.value = false
    systemStatus.value = 'Sistem Bermasalah - 1 kendala (API Down)'
  }
}

onMounted(() => {
  checkSystemHealth()
  healthCheckInterval = setInterval(checkSystemHealth, 3000) // Poll every 3s
})

onUnmounted(() => {
  if (healthCheckInterval) clearInterval(healthCheckInterval)
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════
   ROOT LAYOUT
═══════════════════════════════════════════════════════ */
.dashboard {
  --sb-bg:            #ffffff;
  --sb-bg-2:          #f8fafc;
  --sb-border:        var(--color-border);
  --sb-text-dim:      var(--color-text-muted);
  --sb-text-mid:      var(--color-text-secondary);
  --sb-text-bright:   var(--color-text-primary);
  --sb-accent:        var(--color-primary);
  --sb-accent-glow:   rgba(15, 23, 42, 0.08);
  --sb-hover-bg:      var(--color-border-light);
  --sb-active-bg:     color-mix(in srgb, var(--color-primary) 6%, transparent);
  --tb-height:        58px;
  --tb-bg:            rgba(255,255,255,.82);
  --tb-border:        rgba(226,232,240,.7);
  --sb-width:         232px;

  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--color-bg, #f6f8fb);
}

/* ═══════════════════════════════════════════════════════
   MOBILE HEADER
═══════════════════════════════════════════════════════ */
.mobile-header {
  display: none;
  height: 52px;
  background: var(--sb-bg);
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  position: sticky;
  top: 0;
  z-index: 160;
  border-bottom: 1px solid var(--sb-border);
}

.mobile-header__logo {
  display: flex;
  align-items: center;
  gap: 9px;
}
.mobile-header__logo-icon {
  width: 26px; height: 26px;
  border-radius: 7px;
  background: var(--sb-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.mobile-header__logo-mark {
  font-size: 13.5px;
  font-weight: 800;
  color: var(--sb-text-bright);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.mobile-header__logo-mark span { color: #60a5fa; }

/* Hamburger */
.hamburger-btn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
}
.hamburger-btn__line {
  width: 20px; height: 2px;
  background: var(--sb-text-mid);
  border-radius: 2px;
  transition: all 0.2s;
}
.hamburger-btn__line--short { width: 13px; }

/* ═══════════════════════════════════════════════════════
   SIDEBAR OVERLAY
═══════════════════════════════════════════════════════ */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  backdrop-filter: blur(3px);
  z-index: 190;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.28s ease;
}
.sidebar-overlay--open {
  opacity: 1;
  pointer-events: auto;
}

/* ═══════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════ */
.sidebar {
  position: fixed;
  top: 0; left: 0;
  width: var(--sb-width);
  height: 100vh;
  z-index: 200;
  background: var(--sb-bg);
  border-right: 1px solid var(--sb-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Subtle left-edge glow */
  box-shadow:
    inset -1px 0 0 var(--sb-border),
    4px 0 32px rgba(0,0,0,.18);
}

/* Noise texture overlay */
.sidebar__texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 140px;
  z-index: 0;
}

/* ── Logo ── */
.sidebar__logo {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 22px 18px 16px;
  border-bottom: 1px solid var(--sb-border);
}
.sidebar__logo-icon {
  width: 32px; height: 32px;
  border-radius: 9px;
  background: linear-gradient(135deg, #1d4ed8, #0891b2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59,130,246,.3);
}
.sidebar__logo-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.sidebar__logo-mark {
  font-size: 13px;
  font-weight: 800;
  color: var(--sb-text-bright);
  letter-spacing: 0.07em;
  text-transform: uppercase;
  line-height: 1;
}
.sidebar__logo-accent { color: #60a5fa; }
.sidebar__logo-sub {
  font-size: 10.5px;
  color: var(--sb-text-dim);
  letter-spacing: 0.01em;
}



/* ── Section label ── */
.sidebar__section-label {
  position: relative;
  z-index: 1;
  font-size: 9.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--sb-text-dim);
  padding: 14px 20px 6px;
  opacity: 0.55;
}

/* ── Nav ── */
.sidebar__nav {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 0 10px;
  flex: 1;
  overflow-y: auto;
}
.sidebar__nav::-webkit-scrollbar { display: none; }

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 11px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 500;
  color: var(--sb-text-mid);
  text-decoration: none;
  border: 1px solid transparent;
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  position: relative;
}
.sidebar__item:hover {
  background: var(--sb-hover-bg);
  color: var(--sb-text-bright);
}
.sidebar__item--active {
  background: var(--sb-active-bg) !important;
  color: var(--color-primary) !important;
  border-color: color-mix(in srgb, var(--color-primary) 12%, transparent) !important;
}
.sidebar__item--active .sidebar__item-icon {
  color: var(--color-primary);
}
.sidebar__item--active .sidebar__item-pip {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

.sidebar__item-icon {
  width: 28px; height: 28px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sb-text-dim);
  flex-shrink: 0;
  transition: color 0.15s;
}
.sidebar__item:hover .sidebar__item-icon { color: var(--sb-text-mid); }

.sidebar__item-label {
  flex: 1;
}

/* Active pip indicator on right edge */
.sidebar__item-pip {
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%) scale(0);
  width: 3px;
  height: 16px;
  background: var(--color-primary);
  border-radius: 3px 0 0 3px;
  opacity: 0;
  transition: opacity 0.15s, transform 0.15s;
}

/* ── Bottom area ── */
.sidebar__bottom {
  position: relative;
  z-index: 1;
  padding: 16px 14px 24px;
  border-top: 1px solid var(--sb-border);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sidebar__version {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  color: var(--sb-text-dim);
  letter-spacing: 0.03em;
}
.sidebar__version-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 4px rgba(16,185,129,.6);
  flex-shrink: 0;
}

.sidebar__logout {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-danger);
  background: color-mix(in srgb, var(--color-danger) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-danger) 15%, transparent);
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}
.sidebar__logout:hover {
  background: color-mix(in srgb, var(--color-danger) 10%, transparent);
  color: color-mix(in srgb, var(--color-danger) 90%, black);
  transform: translateY(-1px);
}
.sidebar__logout .sidebar__item-icon {
  width: 20px; height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

/* ═══════════════════════════════════════════════════════
   MAIN WRAPPER
═══════════════════════════════════════════════════════ */
.main-wrapper {
  flex: 1;
  margin-left: var(--sb-width);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
}

/* ═══════════════════════════════════════════════════════
   TOPBAR
═══════════════════════════════════════════════════════ */
.topbar {
  height: var(--tb-height);
  background: var(--tb-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--tb-border);
  box-shadow: 0 1px 0 rgba(255,255,255,.8), 0 2px 12px rgba(0,0,0,.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Breadcrumb */
.topbar__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
}
.topbar__breadcrumb-root {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--color-text-muted);
}
.topbar__breadcrumb-sep {
  color: var(--color-text-muted);
  opacity: 0.45;
}
.topbar__breadcrumb-current {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Right cluster */
.topbar__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.topbar__divider {
  width: 1px; height: 22px;
  background: var(--color-border, #e2e8f0);
  margin: 0 4px;
  opacity: 0.6;
}

/* Notification button */
.topbar__icon-btn {
  position: relative;
  width: 36px; height: 36px;
  border-radius: 9px;
  border: 1px solid rgba(226,232,240,.8);
  background: rgba(255,255,255,.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all 0.15s ease;
}
.topbar__icon-btn:hover {
  background: #fff;
  border-color: #d1d5db;
  color: var(--color-text-primary);
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
  transform: translateY(-1px);
}

.topbar__notif-badge {
  position: absolute;
  top: -4px; right: -4px;
  min-width: 16px; height: 16px;
  padding: 0 4px;
  background: #ef4444;
  color: #fff;
  font-size: 9.5px;
  font-weight: 800;
  border-radius: 10px;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* Profile pill */
.topbar__profile {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px 14px 5px 5px;
  border-radius: 100px;
  border: 1px solid var(--color-border-light);
  background: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.topbar__profile:hover,
.topbar__profile--active {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.topbar__avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #0891b2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}
.topbar__avatar-img {
  width: 100%; height: 100%;
  object-fit: cover;
}

.topbar__user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
}
.topbar__user-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1;
  white-space: nowrap;
}
.topbar__user-role {
  font-size: 11px;
  color: var(--color-text-muted);
  line-height: 1;
  white-space: nowrap;
}

.topbar__chevron {
  color: var(--color-text-muted);
  opacity: 0.5;
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.topbar__chevron--open {
  transform: rotate(180deg);
}

/* ═══════════════════════════════════════════════════════
   PROFILE DROPDOWN
═══════════════════════════════════════════════════════ */
.topbar__profile-wrapper {
  position: relative;
}

.profile-dropdown-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 230px;
  background: var(--color-surface, #ffffff);
  border-radius: 12px;
  box-shadow: 0 12px 36px -6px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0,0,0,0.2);
  border: 1px solid var(--color-border-light);
  padding: 6px;
  z-index: 160;
  animation: dropdown-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: top right;
}

@keyframes dropdown-in {
  from { opacity: 0; transform: scale(0.95) translateY(-4px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.profile-dropdown__header {
  padding: 12px 14px;
}
.profile-dropdown__name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}
.profile-dropdown__email {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-dropdown__divider {
  height: 1px;
  background: var(--color-border-light);
  margin: 4px 0;
}

.profile-dropdown__item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 14px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
  text-align: left;
}
.profile-dropdown__item:hover {
  background: var(--color-neutral-bg);
  color: var(--color-text-primary);
}
.profile-dropdown__item svg {
  color: var(--color-text-muted);
  transition: color 0.15s ease;
}
.profile-dropdown__item:hover svg {
  color: var(--color-text-primary);
}

.profile-dropdown__item--danger {
  color: var(--color-danger);
}
.profile-dropdown__item--danger svg {
  color: var(--color-danger);
}
.profile-dropdown__item--danger:hover {
  background: color-mix(in srgb, var(--color-danger) 8%, transparent);
  color: color-mix(in srgb, var(--color-danger) 90%, black);
}
.profile-dropdown__item--danger:hover svg {
  color: color-mix(in srgb, var(--color-danger) 90%, black);
}

/* ═══════════════════════════════════════════════════════
   MAIN CONTENT
═══════════════════════════════════════════════════════ */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--content-padding, 28px);
  background: var(--color-bg, #f6f8fb);
  min-height: 0;
  /* Subtle inner scroll shadow */
  scroll-behavior: smooth;
}
.main-content::-webkit-scrollbar {
  width: 5px;
}
.main-content::-webkit-scrollbar-track {
  background: transparent;
}
.main-content::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,.12);
  border-radius: 10px;
}

/* ═══════════════════════════════════════════════════════
   MOBILE RESPONSIVE
═══════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  .dashboard { flex-direction: column; }

  .mobile-header { display: flex; }

  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
  }
  .sidebar--open {
    transform: translateX(0);
    box-shadow: 8px 0 40px rgba(0,0,0,.35);
  }
  .sidebar-overlay { display: block; }

  .main-wrapper {
    padding-left: 0;
    width: 100%;
  }
  .topbar { display: none; }
  .main-content { padding: 16px; }
}
</style>