<template>
<<<<<<< HEAD
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
=======
  <div class="dashboard-root">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">💧</div>
          <span class="logo-text" v-show="!sidebarCollapsed">PAKAR-AIR</span>
        </div>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed" aria-label="Toggle Sidebar">
          <svg class="collapse-icon" :class="{ 'rotated': sidebarCollapsed }" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <RouterLink to="/dashboard" class="nav-item" active-class="active-item">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          <span v-show="!sidebarCollapsed">Dashboard</span>
        </RouterLink>
        <RouterLink to="/analysis" class="nav-item" active-class="active-item">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
          <span v-show="!sidebarCollapsed">Analisis Air</span>
        </RouterLink>
        <RouterLink to="/history" class="nav-item" active-class="active-item">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
          <span v-show="!sidebarCollapsed">Riwayat</span>
        </RouterLink>
        <RouterLink to="/education" class="nav-item" active-class="active-item">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          <span v-show="!sidebarCollapsed">Edukasi</span>
        </RouterLink>
        <RouterLink to="/profile" class="nav-item" active-class="active-item">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span v-show="!sidebarCollapsed">Profil</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout" :disabled="authStore.isLoading">
          <span v-if="authStore.isLoading" class="logout-spinner">
            <span class="spinner-sm"></span>
          </span>
          <svg v-else class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span v-show="!sidebarCollapsed">{{ authStore.isLoading ? 'Keluar...' : 'Keluar' }}</span>
        </button>
      </div>
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
    </aside>

    <!-- Main -->
    <div class="main-wrapper">
      <!-- Topbar -->
      <header class="topbar">
<<<<<<< HEAD
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
=======
        <div class="topbar-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <p class="page-subtitle" v-if="pageSubtitle" v-html="pageSubtitle"></p>
        </div>
        <div class="topbar-right">
          
          <router-link to="/notifications" class="notif-btn" aria-label="Notifikasi">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadCount > 0" class="notif-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
          </router-link>

          <router-link to="/profile" class="user-badge" style="text-decoration: none;">
            <img v-if="userAvatar" :src="userAvatar" class="avatar-img" />
            <div v-else class="avatar">{{ userInitial }}</div>
            <div class="user-info-text">
              <span class="user-name">{{ userName }}</span>
              <span class="user-email">{{ authStore.currentUser?.email || 'user@example.com' }}</span>
            </div>
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
          </router-link>
        </div>
      </header>

      <!-- Content -->
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
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
=======
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const sidebarCollapsed = ref(false)

onMounted(() => {
  notificationStore.fetchUnreadCount()
  authStore.fetchProfile() // ensure profile is loaded for topbar
})

const pageTitle = computed(() => {
  if (route.path.startsWith('/dashboard')) return 'Dashboard'
  if (route.path.startsWith('/analysis')) return 'Analisis Air'
  if (route.path.startsWith('/history')) return 'Riwayat Analisis'
  if (route.path.startsWith('/education') || route.path.startsWith('/edukasi')) return 'Edukasi'
  if (route.path.startsWith('/profile')) return 'Profil Saya'
  if (route.path.startsWith('/notifications')) return 'Notifikasi'
  return 'PAKAR-AIR'
})

const pageSubtitle = computed(() => {
  if (route.path.startsWith('/dashboard')) return `Selamat datang, <strong>${userName.value}</strong>!`
  if (route.path.startsWith('/analysis')) return 'Mulai analisis kualitas sampel air baru.'
  if (route.path.startsWith('/history')) return 'Daftar hasil analisis kualitas air yang telah Anda lakukan sebelumnya.'
  return ''
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
})

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

const user = computed(() => authStore.currentUser || {})
const userName = computed(() => user.value?.full_name || user.value?.username || user.value?.email?.split('@')[0] || 'Pengguna')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())
const userAvatar = computed(() => user.value?.avatar_url)
const unreadCount = computed(() => notificationStore.unreadCount)
</script>

<style scoped>
/* ── Root Layout ──────────────────────────────────────────── */
.dashboard-root {
  display: flex;
<<<<<<< HEAD
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
=======
  min-height: 100vh;
  background: #f0f4f8;
  font-family: 'Inter', 'Segoe UI', sans-serif;
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
}

/* ── Sidebar ──────────────────────────────────────────────── */
.sidebar {
<<<<<<< HEAD
  width: var(--sidebar-width);
  flex-shrink: 0;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
=======
  width: 240px;
  background: linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%);
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
<<<<<<< HEAD
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
=======
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
  height: 100vh;
  z-index: 100;
  overflow: hidden;
}
.sidebar-collapsed { width: 72px; }

<<<<<<< HEAD
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
=======
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  overflow: hidden;
}
.logo-icon {
  width: 2.25rem;
  height: 2.25rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
.logo-text {
  font-weight: 800;
  color: #fff;
  font-size: 1rem;
  white-space: nowrap;
  letter-spacing: -0.3px;
}
.collapse-btn {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0.35rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  transition: background 0.2s, color 0.2s;
  flex-shrink: 0;
}
.collapse-btn:hover { background: rgba(255, 255, 255, 0.15); color: #fff; }
.collapse-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s;
}
.collapse-icon.rotated { transform: rotate(180deg); }

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.75rem;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.nav-item:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
.active-item {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.25);
}
.nav-icon { width: 1.1rem; height: 1.1rem; flex-shrink: 0; }

.sidebar-footer {
  padding: 1rem 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.75rem;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.logout-btn:hover:not(:disabled) { background: rgba(239, 68, 68, 0.25); color: #fecaca; }
.logout-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.logout-spinner { display: flex; align-items: center; }
.spinner-sm {
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Main Wrapper ─────────────────────────────────────────── */
.main-wrapper {
  flex: 1;
  margin-left: 240px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sidebar-collapsed ~ .main-wrapper { margin-left: 72px; }

/* ── Topbar ───────────────────────────────────────────────── */
.topbar {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
<<<<<<< HEAD
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
=======
  z-index: 50;
}
.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}
.page-subtitle {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0.15rem 0 0;
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notif-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
  transition: background 0.2s;
  cursor: pointer;
}
.notif-btn:hover { background: #f1f5f9; }
.notif-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  border: 2px solid white;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 0.375rem 1rem 0.375rem 0.375rem;
  cursor: pointer;
  transition: background 0.2s;
}
.user-badge:hover {
  background: #f1f5f9;
}
.avatar {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
}
.avatar-img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}
.user-info-text {
  display: flex;
  flex-direction: column;
}
<<<<<<< HEAD

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
=======
.user-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
}
.user-email {
  font-size: 0.75rem;
  color: #64748b;
}

/* ── Main Content ─────────────────────────────────────────── */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-content { padding: 1rem; }
  .topbar { padding: 1rem; }
  .user-email { display: none; }
>>>>>>> 94642f67206f872f05a9a345f263228187656abd
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