<template>
  <div class="admin-root">

    <!-- SIDEBAR ADMIN -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">💧</div>
          <span class="logo-text" v-show="!sidebarCollapsed">PAKAR-AIR</span>
        </div>
        <button
          class="collapse-btn"
          @click="sidebarCollapsed = !sidebarCollapsed"
          aria-label="Toggle Sidebar"
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

      <nav class="sidebar-nav">
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
      </nav>

      <div class="sidebar-divider"></div>

      <div class="sidebar-footer">
        <!-- Back to user area -->
        <RouterLink to="/dashboard" class="nav-item nav-item--secondary">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span v-show="!sidebarCollapsed">Kembali ke Dashboard</span>
        </RouterLink>

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
            <div class="user-meta" v-show="!isMobile">
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const sidebarCollapsed = ref(false)
const isLoggingOut = ref(false)
const isMobile = ref(window.innerWidth < 640)

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const token = computed(() => localStorage.getItem('token'))

const userName = computed(() => {
  try {
    const user = JSON.parse(localStorage.getItem('pakar_air_user') || '{}')
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
    localStorage.removeItem('token')
    localStorage.removeItem('pakar_air_token')
    localStorage.removeItem('pakar_air_refresh_token')
    localStorage.removeItem('pakar_air_user')
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
  min-height: 100vh;
  background: #f0f4f8;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* ── Sidebar ── */
.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  height: 100vh;
  z-index: 100;
  overflow: hidden;
}
.sidebar-collapsed { width: 72px; }

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
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}
.logo-text {
  font-weight: 800;
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.collapse-btn {
  background: rgba(255,255,255,0.06);
  border: none;
  border-radius: 6px;
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
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
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
  color: #fff;
}
.nav-item--active,
.router-link-active.nav-item {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.nav-item--secondary {
  color: rgba(255,255,255,0.4);
}
.nav-item--secondary:hover {
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.7);
}

.nav-item--logout {
  color: rgba(248, 113, 113, 0.7);
}
.nav-item--logout:hover {
  background: rgba(248, 113, 113, 0.1);
  color: #f87171;
}

.sidebar-divider {
  border-top: 1px solid rgba(255,255,255,0.07);
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
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.main-wrapper--expanded {
  margin-left: 72px;
}

/* ── Topbar ── */
.topbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  position: sticky;
  top: 0;
  z-index: 50;
  gap: 16px;
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
  background: #eff6ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid #bfdbfe;
}
.topbar-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #94a3b8;
}
.breadcrumb-active {
  color: #1e293b;
  font-weight: 600;
}

.topbar-right { display: flex; align-items: center; gap: 12px; }
.user-info { display: flex; align-items: center; gap: 10px; }
.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.user-name { font-size: 13px; font-weight: 600; color: #1e293b; }
.user-role { font-size: 11px; color: #94a3b8; }

/* ── Content ── */
.main-content {
  flex: 1;
  padding: 28px;
  background: #f0f4f8;
}
</style>
