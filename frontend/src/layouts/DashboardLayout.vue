<template>
  <div class="dashboard">

    <!-- Mobile Header -->
    <header class="mobile-header">
      <div class="mobile-header__logo">
        <span class="mobile-header__logo-mark">PAKAR-AIR</span>
      </div>
      <button class="hamburger-btn" @click="isMobileMenuOpen = true" aria-label="Buka Menu">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </header>

    <!-- Sidebar Overlay for Mobile -->
    <div class="sidebar-overlay" :class="{ 'sidebar-overlay--open': isMobileMenuOpen }" @click="isMobileMenuOpen = false"></div>

    <!-- SIDEBAR (fixed) -->
    <aside class="sidebar" :class="{ 'sidebar--open': isMobileMenuOpen }">
      <div class="sidebar__logo">
        <span class="sidebar__logo-mark">PAKAR-AIR</span>
        <span class="sidebar__logo-sub">Deteksi Kualitas Air</span>
      </div>

      <hr class="sidebar__divider" />

      <nav class="sidebar__nav" @click="isMobileMenuOpen = false">
        <router-link to="/dashboard" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </router-link>

        <router-link to="/analysis" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Analisis Baru
        </router-link>

        <router-link to="/history" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Riwayat
        </router-link>

        <router-link to="/education" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Edukasi
        </router-link>

        <router-link to="/profile" class="sidebar__item">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profil
        </router-link>
      </nav>

      <hr class="sidebar__divider sidebar__divider--bottom" />

      <button class="sidebar__item sidebar__item--logout" @click="handleLogout">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Keluar
      </button>
    </aside>

    <!-- RIGHT AREA -->
    <div class="layout-right">

      <!-- TOPBAR (fixed) -->
      <header class="topbar">
        <div class="topbar__breadcrumb">
          <span>Aplikasi</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="topbar__breadcrumb--active">{{ currentPageTitle }}</span>
        </div>

        <div class="topbar__right">
          <router-link to="/notifications" class="topbar__icon-btn" aria-label="Notifikasi">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </router-link>

          <router-link to="/profile" class="topbar__profile">
            <div class="topbar__avatar">{{ userInitial }}</div>
            <div class="topbar__user-info">
              <span class="topbar__user-name">{{ userName }}</span>
              <span class="topbar__user-role">{{ userRole }}</span>
            </div>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </router-link>
        </div>
      </header>

      <!-- CONTENT (scrolls only here) -->
      <main class="layout-content">
        <slot>
          <router-view />
        </slot>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const isMobileMenuOpen = ref(false)

const routeMap = {
  '/dashboard': 'Ringkasan Kualitas Air',
  '/analysis': 'Analisis Kualitas Air',
  '/history': 'Riwayat Analisis',
  '/education': 'Pusat Edukasi',
  '/profile': 'Pengaturan Profil',
  '/artikel': 'Membaca Artikel Edukasi',
  '/artikel2': 'Membaca Artikel Edukasi',
  '/artikel3': 'Membaca Artikel Edukasi'
}

const currentPageTitle = computed(() => {
  if (route.name === 'history-detail') {
    return 'Detail Riwayat'
  }
  return routeMap[route.path] || 'PAKAR-AIR'
})

async function handleLogout() {
  const token = sessionStorage.getItem('pakar_air_token') || sessionStorage.getItem('token')
  try {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
    await axios.post(`${API_BASE}/api/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  } catch { }
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('pakar_air_token')
  sessionStorage.removeItem('pakar_air_refresh_token')
  sessionStorage.removeItem('pakar_air_user')
  delete axios.defaults.headers.common['Authorization']
  router.push('/login')
}

const user = computed(() => {
  try {
    return JSON.parse(sessionStorage.getItem('pakar_air_user') || '{}')
  } catch {
    return {}
  }
})

const userName = computed(() => user.value?.full_name || user.value?.email?.split('@')[0] || 'Pengguna')
const userRole = computed(() => user.value?.is_admin ? 'Administrator' : 'Pengguna')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())
</script>

<style scoped>
/* ── Root ── */
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: var(--color-bg);
}

/* ── Mobile Header ── */
.mobile-header {
  display: none;
  height: var(--topbar-height);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  z-index: 150;
}

.mobile-header__logo-mark {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 0.3px;
}

.hamburger-btn {
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  padding: 4px;
}

.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: 150;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.sidebar-overlay--open {
  opacity: 1;
  pointer-events: auto;
}

/* ── Sidebar ── */
.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 200;
  transition: transform 0.3s;
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
  color: var(--color-text-primary);
  letter-spacing: 0.3px;
}

.sidebar__logo-sub {
  font-size: 11px;
  color: var(--color-text-muted);
}

.sidebar__divider {
  border: none;
  border-top: 1px solid var(--color-border);
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
  overflow-y: auto;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.sidebar__item:hover {
  background: var(--color-neutral-bg);
  color: var(--color-text-primary);
}

.sidebar__item.router-link-active {
  background: var(--color-info-bg);
  color: var(--color-accent-hover);
}

.sidebar__item.router-link-active svg {
  color: var(--color-accent-hover);
}

.sidebar__item--logout {
  margin: 0 10px;
  color: var(--color-text-breadcrumb);
}

.sidebar__item--logout:hover {
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
}

/* ── Right area ── */
.layout-right {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  min-width: 0;
}

/* ── Topbar ── */
.topbar {
  height: var(--topbar-height);
  background: rgba(255, 255, 255, 0.80);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--content-padding);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.2s ease;
}

.topbar__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-base);
  color: var(--color-text-breadcrumb);
}

.topbar__breadcrumb--active {
  color: var(--color-text-primary);
  font-weight: 500;
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar__icon-btn {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.topbar__icon-btn:hover {
  background: #ffffff;
  color: var(--color-primary);
  border-color: rgba(226, 232, 240, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  transform: translateY(-1px);
}

.topbar__profile {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4px 10px 4px 4px;
  border-radius: 20px;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.topbar__profile:hover {
  background: #ffffff;
  border-color: rgba(226, 232, 240, 0.8);
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.topbar__avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.topbar__user-info {
  display: flex;
  flex-direction: column;
}

.topbar__user-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.topbar__user-role {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.2;
}

/* ── Content ── */
.layout-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--content-padding);
  background: var(--color-bg);
  min-height: 0;
}

/* ── Mobile Responsive ── */
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }
  .mobile-header {
    display: flex;
  }
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar--open {
    transform: translateX(0);
  }
  .sidebar-overlay {
    display: block;
  }
  .layout-right {
    margin-left: 0;
  }
  .topbar {
    display: none;
  }
  .layout-content {
    padding: 1rem;
  }
}
</style>