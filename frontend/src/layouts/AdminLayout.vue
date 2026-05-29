<template>
  <div class="admin-root">

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

    <!-- SIDEBAR ADMIN -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed, 'sidebar--open': isMobileMenuOpen }">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <span class="logo-text" v-show="!sidebarCollapsed">PAKAR-AIR</span>
        </div>
        <button
          class="collapse-btn"
          @click="sidebarCollapsed = !sidebarCollapsed"
          aria-label="Toggle Sidebar"
          v-show="!isMobileView"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            class="collapse-icon"
            :class="{ rotated: sidebarCollapsed }"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div class="sidebar-badge" v-show="!sidebarCollapsed">
        <span class="badge-label">Panel Admin</span>
      </div>

      <nav class="sidebar-nav" @click="handleMobileNavClick">
        <RouterLink to="/admin" exact class="nav-item" active-class="nav-item--active">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span v-show="!sidebarCollapsed">Dashboard</span>
        </RouterLink>

        <RouterLink to="/admin/users" class="nav-item" active-class="nav-item--active">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span v-show="!sidebarCollapsed">Kelola Pengguna</span>
        </RouterLink>

        <RouterLink to="/admin/reports" class="nav-item" active-class="nav-item--active">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span v-show="!sidebarCollapsed">Laporan</span>
        </RouterLink>

        <RouterLink to="/admin/chatbot" class="nav-item" active-class="nav-item--active">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span v-show="!sidebarCollapsed">AI Chatbot</span>
        </RouterLink>
      </nav>

      <div class="sidebar-divider"></div>

      <div class="sidebar-footer">
        <button class="nav-item nav-item--logout" @click="handleLogout" :disabled="isLoggingOut">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span v-show="!sidebarCollapsed">{{ isLoggingOut ? 'Keluar...' : 'Keluar' }}</span>
        </button>
      </div>
    </aside>

    <!-- MAIN AREA -->
    <div class="main-wrapper" :class="{ 'main-wrapper--expanded': sidebarCollapsed }">

      <!-- TOPBAR -->
      <header class="topbar">
        <div class="topbar-left">
          <div class="admin-tag">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Admin
          </div>
          <div class="topbar-breadcrumb">
            <span>Admin</span>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span class="breadcrumb-active">{{ currentPageTitle }}</span>
          </div>
        </div>

        <div class="topbar-right">
          <div class="user-info">
            <div class="avatar">{{ userInitial }}</div>
            <div class="user-meta" v-show="!isMobileView">
              <span class="user-name">{{ userName }}</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <!-- CONTENT -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const sidebarCollapsed = ref(false)
const isLoggingOut = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileView = ref(window.innerWidth <= 768)

function updateWidth() {
  isMobileView.value = window.innerWidth <= 768
  if (isMobileView.value) {
    sidebarCollapsed.value = false
  }
}

onMounted(() => window.addEventListener('resize', updateWidth))
onUnmounted(() => window.removeEventListener('resize', updateWidth))

function handleMobileNavClick() {
  if (isMobileView.value) {
    isMobileMenuOpen.value = false
  }
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const token = computed(() => sessionStorage.getItem('token') || sessionStorage.getItem('pakar_air_token'))

const userName = computed(() => {
  try {
    const user = JSON.parse(sessionStorage.getItem('pakar_air_user') || '{}')
    return user.full_name || user.username || user.email || 'Admin'
  } catch {
    return 'Admin'
  }
})

const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase()
})

const currentPageTitle = computed(() => {
  const map = {
    '/admin': 'Dashboard',
    '/admin/users': 'Kelola Pengguna',
    '/admin/reports': 'Laporan',
    '/admin/chatbot': 'AI Chatbot',
  }
  return map[route.path] || 'Panel Admin'
})

async function handleLogout() {
  isLoggingOut.value = true
  try {
    await axios.post(
      `${API_BASE}/api/auth/logout`,
      {},
      { headers: { Authorization: `Bearer ${token.value}` } }
    )
  } catch {
    // Tetap logout meski gagal
  } finally {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('pakar_air_token')
    sessionStorage.removeItem('pakar_air_refresh_token')
    sessionStorage.removeItem('pakar_air_user')
    delete axios.defaults.headers.common['Authorization']
    isLoggingOut.value = false
    router.push('/login')
  }
}
</script>

<style scoped>
/* ── Root ── */
.admin-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg);
  font-family: var(--font-sans);
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
  background: var(--bg-sidebar-admin);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s;
  position: fixed;
  height: 100vh;
  z-index: 200;
  overflow: hidden;
  left: 0;
  top: 0;
}
.sidebar-collapsed { width: var(--sidebar-width-collapsed); }

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid var(--border-sidebar-admin);
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
  background: linear-gradient(135deg, var(--color-logo-start), var(--color-logo-end));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  box-shadow: var(--shadow-md);
}
.logo-text {
  font-weight: 800;
  color: #fff;
  font-size: var(--font-size-md);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.collapse-btn {
  background: rgba(255,255,255,0.06);
  border: none;
  border-radius: var(--radius-md);
  padding: 6px;
  cursor: pointer;
  color: rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  transition: background 0.15s;
}
.collapse-btn:hover { background: rgba(255,255,255,0.12); }
.collapse-icon { transition: transform 0.3s; }
.collapse-icon.rotated { transform: rotate(180deg); }

.sidebar-badge {
  padding: 8px 16px;
  margin-top: 4px;
}
.badge-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-sidebar-admin);
  text-decoration: none;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-sidebar-admin-hover);
}
.nav-item--active,
.router-link-active.nav-item {
  background: var(--color-nav-active-bg);
  color: var(--text-sidebar-admin-active);
}

.nav-item--logout {
  color: var(--text-sidebar-admin-logout);
}
.nav-item--logout:hover {
  background: var(--bg-sidebar-admin-logout);
  color: #f87171;
}

.sidebar-divider {
  border-top: 1px solid var(--border-sidebar-admin);
  margin: 4px 0;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px 16px;
}

/* ── Main wrapper ── */
.main-wrapper {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.main-wrapper--expanded {
  margin-left: var(--sidebar-width-collapsed);
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
  position: sticky;
  top: 0;
  z-index: 100;
  gap: 16px;
  transition: all 0.2s ease;
}
.topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.admin-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--color-info-bg);
  color: var(--color-accent-hover);
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid var(--color-info-border);
}
.topbar-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-base);
  color: var(--color-text-breadcrumb);
}
.breadcrumb-active {
  color: var(--color-text-primary);
  font-weight: 600;
}

.topbar-right { display: flex; align-items: center; gap: 12px; }
.user-info { display: flex; align-items: center; gap: 10px; }
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-logo-start), var(--color-logo-end));
  color: #fff;
  font-size: var(--font-size-base);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}
.user-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.user-name { font-size: var(--font-size-base); font-weight: 600; color: var(--color-text-primary); }
.user-role { font-size: var(--font-size-xs); color: var(--color-text-muted); }

/* ── Content ── */
.main-content {
  flex: 1;
  padding: var(--content-padding);
  background: var(--color-bg);
}

/* ── Mobile Responsive ── */
@media (max-width: 768px) {
  .admin-root {
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
  .main-wrapper {
    margin-left: 0;
  }
  .main-wrapper--expanded {
    margin-left: 0;
  }
  .topbar {
    display: none;
  }
  .main-content {
    padding: 1rem;
  }
}
</style>
