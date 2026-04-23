<template>
  <div class="admin-users-root">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">💧</div>
          <span class="logo-text" v-show="!sidebarCollapsed">PAKAR-AIR</span>
        </div>
        <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <ChevronLeftIcon class="collapse-icon" :class="{ rotated: sidebarCollapsed }" />
        </button>
      </div>
      <nav class="sidebar-nav">
        <RouterLink to="/dashboard" class="nav-item">
          <LayoutDashboardIcon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Dashboard</span>
        </RouterLink>
        <RouterLink to="/admin" class="nav-item">
          <BarChart2Icon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Admin Dashboard</span>
        </RouterLink>
        <RouterLink to="/admin/users" class="nav-item active-item">
          <UsersIcon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Kelola Pengguna</span>
        </RouterLink>
        <RouterLink to="/admin/reports" class="nav-item">
          <FileTextIcon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Laporan</span>
        </RouterLink>
      </nav>
      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <LogOutIcon class="nav-icon" />
          <span v-show="!sidebarCollapsed">Keluar</span>
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="main-wrapper">
      <!-- Topbar -->
      <header class="topbar">
        <div class="topbar-left">
          <h1 class="page-title">Kelola Pengguna</h1>
          <p class="page-subtitle">Manajemen akun pengguna PAKAR-AIR</p>
        </div>
        <div class="topbar-right">
          <div class="user-badge">
            <div class="avatar">{{ initials(authStore.currentUser?.full_name || 'Admin') }}</div>
            <span class="user-label">{{ authStore.currentUser?.full_name || 'Admin' }}</span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="main-content">

        <!-- Stats cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon-wrap blue">
              <UsersIcon class="stat-icon" />
            </div>
            <div>
              <div class="stat-value">{{ users.length }}</div>
              <div class="stat-label">Total Pengguna</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrap green">
              <UserCheckIcon class="stat-icon" />
            </div>
            <div>
              <div class="stat-value">{{ activeCount }}</div>
              <div class="stat-label">Aktif</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrap red">
              <UserXIcon class="stat-icon" />
            </div>
            <div>
              <div class="stat-value">{{ inactiveCount }}</div>
              <div class="stat-label">Dinonaktifkan</div>
            </div>
          </div>
        </div>

        <!-- Search & Filter Bar -->
        <div class="toolbar">
          <div class="search-wrap">
            <SearchIcon class="search-icon" />
            <input
              v-model="searchQuery"
              class="search-input"
              placeholder="Cari username atau nama..."
              type="text"
            />
          </div>
          <div class="filter-wrap">
            <select v-model="filterStatus" class="filter-select">
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
          <button class="btn-refresh" @click="fetchUsers" :disabled="loading">
            <RefreshCwIcon class="btn-icon" :class="{ spinning: loading }" />
            Refresh
          </button>
        </div>

        <!-- Error Banner -->
        <div v-if="error" class="error-banner">
          <AlertCircleIcon class="error-icon" />
          {{ error }}
          <button class="error-close" @click="error = ''">✕</button>
        </div>

        <!-- Loading State -->
        <div v-if="loading && users.length === 0" class="loading-state">
          <div class="loader-ring"></div>
          <p>Memuat data pengguna...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="!loading && filteredUsers.length === 0" class="empty-state">
          <UsersIcon class="empty-icon" />
          <p class="empty-title">Tidak ada pengguna ditemukan</p>
          <p class="empty-sub">Coba ubah kata kunci pencarian atau filter</p>
        </div>

        <!-- Table -->
        <div v-else class="table-wrap">
          <table class="user-table">
            <thead>
              <tr>
                <th>Pengguna</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Bergabung</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                class="user-row"
                :class="{ 'row-inactive': !user.is_active }"
              >
                <!-- Avatar + Name -->
                <td class="td-user">
                  <div class="user-avatar">
                    {{ initials(user.full_name) }}
                  </div>
                  <div class="user-info">
                    <span class="user-name">{{ user.full_name }}</span>
                  </div>
                </td>

                <!-- Username -->
                <td class="td-username">
                  <span class="username-badge">@{{ user.username }}</span>
                </td>

                <!-- Role -->
                <td class="td-role">
                  <span class="role-badge" :class="user.is_admin ? 'role-admin' : 'role-user'">
                    <ShieldCheckIcon v-if="user.is_admin" class="role-icon" />
                    <UserIcon v-else class="role-icon" />
                    {{ user.is_admin ? 'Admin' : 'User' }}
                  </span>
                </td>

                <!-- Status -->
                <td class="td-status">
                  <span class="status-badge" :class="user.is_active ? 'status-active' : 'status-inactive'">
                    <span class="status-dot"></span>
                    {{ user.is_active ? 'Aktif' : 'Nonaktif' }}
                  </span>
                </td>

                <!-- Join Date -->
                <td class="td-date">
                  {{ formatDate(user.created_at) }}
                </td>

                <!-- Actions -->
                <td class="td-actions">
                  <div class="action-group">
                    <!-- PKD20TPA-33: Toggle Active/Inactive (komponen terpisah) -->
                    <UserStatusToggle
                      v-if="!user.is_admin"
                      :user="user"
                      @toggled="onUserToggled"
                      @error="onToggleError"
                    />

                    <!-- Delete -->
                    <button
                      v-if="!user.is_admin"
                      class="btn-action btn-delete"
                      :disabled="actionLoading[user.id]"
                      title="Hapus akun"
                      @click="confirmDeleteUser(user)"
                    >
                      <Trash2Icon class="action-icon" />
                    </button>

                    <!-- Admin protected (no actions) -->
                    <span v-if="user.is_admin" class="admin-protected">
                      <LockIcon class="lock-icon" /> Terlindungi
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination info -->
        <div v-if="filteredUsers.length > 0" class="table-footer">
          <span class="table-info">
            Menampilkan {{ filteredUsers.length }} dari {{ users.length }} pengguna
          </span>
        </div>

      </main>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast-slide">
      <div v-if="toast.show" class="toast" :class="`toast-${toast.type}`">
        <CheckCircleIcon v-if="toast.type === 'success'" class="toast-icon" />
        <AlertCircleIcon v-else class="toast-icon" />
        {{ toast.message }}
      </div>
    </Transition>

    <!-- Confirm Delete Modal -->
    <Transition name="modal-fade">
      <div v-if="deleteModal.show" class="modal-overlay" @click.self="deleteModal.show = false">
        <div class="modal-card">
          <div class="modal-icon">🗑️</div>
          <h3 class="modal-title">Hapus Akun Pengguna?</h3>
          <p class="modal-desc">
            Akun <strong>{{ deleteModal.user?.full_name }}</strong> akan dihapus permanen beserta
            semua data analisisnya. Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="modal-actions">
            <button class="modal-cancel" @click="deleteModal.show = false">Batal</button>
            <button
              class="modal-confirm"
              :disabled="actionLoading[deleteModal.user?.id]"
              @click="handleDeleteUser(deleteModal.user)"
            >
              <span v-if="actionLoading[deleteModal.user?.id]">
                <span class="spinner-sm"></span> Menghapus...
              </span>
              <span v-else>Ya, Hapus</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  LayoutDashboardIcon,
  UsersIcon,
  FileTextIcon,
  BarChart2Icon,
  LogOutIcon,
  ChevronLeftIcon,
  SearchIcon,
  RefreshCwIcon,
  UserIcon,
  ShieldCheckIcon,
  Trash2Icon,
  LockIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { listUsers, deleteUser as apiDeleteUser } from '@/api/admin'

// PKD20TPA-33: komponen toggle status user
import UserStatusToggle from '@/components/admin/UserStatusToggle.vue'

const router = useRouter()
const authStore = useAuthStore()

// ── State ──────────────────────────────────────────────────────
const sidebarCollapsed = ref(false)
const users = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const filterStatus = ref('all')
const actionLoading = reactive({})

const deleteModal = reactive({ show: false, user: null })
const toast = reactive({ show: false, type: 'success', message: '' })

// ── Computed ───────────────────────────────────────────────────
const activeCount = computed(() => users.value.filter(u => u.is_active).length)
const inactiveCount = computed(() => users.value.filter(u => !u.is_active).length)

const filteredUsers = computed(() => {
  let result = users.value
  if (filterStatus.value === 'active') result = result.filter(u => u.is_active)
  if (filterStatus.value === 'inactive') result = result.filter(u => !u.is_active)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      u =>
        u.full_name?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q)
    )
  }
  return result
})

// ── Helpers ────────────────────────────────────────────────────
function initials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function showToast(message, type = 'success') {
  toast.message = message
  toast.type = type
  toast.show = true
  setTimeout(() => (toast.show = false), 3500)
}

// ── API Calls ──────────────────────────────────────────────────

/**
 * PKD20TPA-32: Fetch semua pengguna dari backend
 * Menggunakan listUsers() dari admin.js → GET /api/admin/users
 */
async function fetchUsers() {
  loading.value = true
  error.value = ''
  try {
    users.value = await listUsers()
  } catch (err) {
    error.value =
      err.response?.data?.detail ||
      'Gagal memuat data pengguna. Pastikan Anda memiliki akses admin.'
  } finally {
    loading.value = false
  }
}

/**
 * PKD20TPA-33: Handler event dari UserStatusToggle.vue
 * Dipanggil setelah komponen berhasil toggle status.
 * Update state lokal tanpa fetch ulang.
 */
function onUserToggled({ userId, isActive }) {
  const user = users.value.find(u => u.id === userId)
  if (user) user.is_active = isActive
  showToast(
    isActive
      ? `Akun ${user?.full_name} berhasil diaktifkan.`
      : `Akun ${user?.full_name} berhasil dinonaktifkan.`,
    'success'
  )
}

function onToggleError(message) {
  showToast(message, 'error')
}

function confirmDeleteUser(user) {
  deleteModal.user = user
  deleteModal.show = true
}

/**
 * Hapus pengguna secara permanen
 * Menggunakan deleteUser() dari admin.js → DELETE /api/admin/users/:id
 *
 * @param {Object} user - objek pengguna yang akan dihapus
 */
async function handleDeleteUser(user) {
  if (!user) return
  actionLoading[user.id] = true
  try {
    await apiDeleteUser(user.id)
    users.value = users.value.filter(u => u.id !== user.id)
    deleteModal.show = false
    showToast(`Akun ${user.full_name} berhasil dihapus.`, 'success')
  } catch (err) {
    showToast(
      err.response?.data?.detail || 'Gagal menghapus pengguna.',
      'error'
    )
  } finally {
    actionLoading[user.id] = false
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

// ── Lifecycle ──────────────────────────────────────────────────
onMounted(fetchUsers)
</script>

<style scoped>
/* ── Root Layout ──────────────────────────────────────────────── */
.admin-users-root {
  display: flex;
  min-height: 100vh;
  background: #f0f4f8;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* ── Sidebar ──────────────────────────────────────────────────── */
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
  border-bottom: 1px solid rgba(255,255,255,0.08);
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
  box-shadow: 0 4px 12px rgba(59,130,246,0.4);
}
.logo-text {
  font-weight: 800;
  color: #fff;
  font-size: 1rem;
  white-space: nowrap;
  letter-spacing: -0.3px;
}
.collapse-btn {
  background: rgba(255,255,255,0.08);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 0.35rem;
  color: rgba(255,255,255,0.5);
  display: flex;
  transition: background 0.2s, color 0.2s;
  flex-shrink: 0;
}
.collapse-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
.collapse-icon { width: 1rem; height: 1rem; transition: transform 0.3s; }
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
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.nav-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
.active-item {
  background: rgba(59,130,246,0.2);
  color: #93c5fd;
  border: 1px solid rgba(59,130,246,0.25);
}
.nav-icon { width: 1.1rem; height: 1.1rem; flex-shrink: 0; }

.sidebar-footer {
  padding: 1rem 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.75rem;
  border-radius: 10px;
  color: rgba(255,255,255,0.55);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  width: 100%;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
}
.logout-btn:hover { background: rgba(239,68,68,0.15); color: #fca5a5; }

/* ── Main Wrapper ─────────────────────────────────────────────── */
.main-wrapper {
  flex: 1;
  margin-left: 240px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sidebar-collapsed ~ .main-wrapper { margin-left: 72px; }

/* ── Topbar ───────────────────────────────────────────────────── */
.topbar {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
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
  color: #94a3b8;
  margin: 0.15rem 0 0;
}
.topbar-right { display: flex; align-items: center; gap: 1rem; }
.user-badge { display: flex; align-items: center; gap: 0.5rem; }
.avatar {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.7rem;
}
.user-label { font-size: 0.875rem; font-weight: 600; color: #475569; }

/* ── Main Content ─────────────────────────────────────────────── */
.main-content { flex: 1; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }

/* ── Stats Grid ───────────────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid #f1f5f9;
}
.stat-icon-wrap {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon-wrap.blue { background: #eff6ff; }
.stat-icon-wrap.green { background: #f0fdf4; }
.stat-icon-wrap.red { background: #fff1f2; }
.stat-icon { width: 1.25rem; height: 1.25rem; }
.stat-icon-wrap.blue .stat-icon { color: #3b82f6; }
.stat-icon-wrap.green .stat-icon { color: #22c55e; }
.stat-icon-wrap.red .stat-icon { color: #ef4444; }
.stat-value { font-size: 1.5rem; font-weight: 800; color: #0f172a; line-height: 1; }
.stat-label { font-size: 0.8rem; color: #94a3b8; margin-top: 0.2rem; }

/* ── Toolbar ──────────────────────────────────────────────────── */
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.search-wrap {
  flex: 1;
  min-width: 220px;
  position: relative;
}
.search-icon {
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #94a3b8;
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 0.625rem 0.875rem 0.625rem 2.5rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #0f172a;
  background: #fff;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.search-input:focus { border-color: #3b82f6; }
.filter-select {
  padding: 0.625rem 0.875rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #475569;
  background: #fff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}
.filter-select:focus { border-color: #3b82f6; }
.btn-refresh {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.625rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  white-space: nowrap;
}
.btn-refresh:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; }
.btn-refresh:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-icon { width: 1rem; height: 1rem; }
.spinning { animation: spin 0.8s linear infinite; }

/* ── Error Banner ─────────────────────────────────────────────── */
.error-banner {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 0.875rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
}
.error-icon { width: 1rem; height: 1rem; flex-shrink: 0; }
.error-close {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #991b1b;
  font-size: 0.875rem;
  padding: 0 0.25rem;
}

/* ── Loading & Empty State ────────────────────────────────────── */
.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #94a3b8;
  gap: 1rem;
}
.loader-ring {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.empty-icon { width: 3rem; height: 3rem; opacity: 0.3; }
.empty-title { font-size: 1rem; font-weight: 600; color: #64748b; margin: 0; }
.empty-sub { font-size: 0.875rem; color: #94a3b8; margin: 0; }

/* ── Table ────────────────────────────────────────────────────── */
.table-wrap {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  overflow: hidden;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
.user-table thead tr {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.user-table th {
  padding: 0.875rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.user-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s;
}
.user-row:last-child { border-bottom: none; }
.user-row:hover { background: #f8fafc; }
.row-inactive { opacity: 0.65; }
.user-table td { padding: 0.875rem 1rem; vertical-align: middle; }

/* ── Table Cells ──────────────────────────────────────────────── */
.td-user { display: flex; align-items: center; gap: 0.75rem; min-width: 180px; }
.user-avatar {
  width: 2.25rem;
  height: 2.25rem;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
}
.user-name { font-weight: 600; color: #0f172a; font-size: 0.875rem; }
.username-badge {
  background: #f1f5f9;
  color: #475569;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-family: monospace;
}
.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.625rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.role-admin { background: #eff6ff; color: #2563eb; }
.role-user { background: #f0fdf4; color: #16a34a; }
.role-icon { width: 0.75rem; height: 0.75rem; }

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.status-active { background: #dcfce7; color: #166534; }
.status-inactive { background: #fee2e2; color: #991b1b; }
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.td-date { color: #64748b; white-space: nowrap; }

/* ── Action Buttons ───────────────────────────────────────────── */
.action-group { display: flex; align-items: center; gap: 0.5rem; }
.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid;
  transition: background 0.2s, opacity 0.2s;
  white-space: nowrap;
}
.btn-action:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-deactivate {
  background: #fff7ed;
  color: #c2410c;
  border-color: #fed7aa;
}
.btn-deactivate:hover:not(:disabled) { background: #ffedd5; }
.btn-activate {
  background: #f0fdf4;
  color: #15803d;
  border-color: #bbf7d0;
}
.btn-activate:hover:not(:disabled) { background: #dcfce7; }
.btn-delete {
  background: #fff;
  color: #ef4444;
  border-color: #fecaca;
  padding: 0.4rem;
}
.btn-delete:hover:not(:disabled) { background: #fee2e2; }
.action-icon { width: 0.9rem; height: 0.9rem; }
.action-spinner {
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid rgba(0,0,0,0.15);
  border-top-color: currentColor;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.7s linear infinite;
}
.admin-protected {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: #94a3b8;
  padding: 0.4rem 0.75rem;
}
.lock-icon { width: 0.8rem; height: 0.8rem; }

/* ── Table Footer ─────────────────────────────────────────────── */
.table-footer {
  padding: 0.875rem 1rem;
  border-top: 1px solid #f1f5f9;
  background: #fafafa;
}
.table-info { font-size: 0.8rem; color: #94a3b8; }

/* ── Toast ────────────────────────────────────────────────────── */
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  max-width: 360px;
}
.toast-success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
.toast-error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
.toast-icon { width: 1rem; height: 1rem; flex-shrink: 0; }
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.3s ease; }
.toast-slide-enter-from { transform: translateX(100%); opacity: 0; }
.toast-slide-leave-to { transform: translateX(100%); opacity: 0; }

/* ── Modal ────────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}
.modal-card {
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
}
.modal-icon { font-size: 3rem; margin-bottom: 1rem; }
.modal-title { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 0.5rem; }
.modal-desc { font-size: 0.875rem; color: #64748b; margin: 0 0 1.5rem; line-height: 1.5; }
.modal-actions { display: flex; gap: 0.75rem; }
.modal-cancel {
  flex: 1;
  padding: 0.75rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: none;
  color: #475569;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-cancel:hover { background: #f8fafc; }
.modal-confirm {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
.modal-confirm:hover:not(:disabled) { opacity: 0.9; }
.spinner-sm {
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.7s linear infinite;
}
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── Keyframes ────────────────────────────────────────────────── */
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .main-content { padding: 1rem; }
  .topbar { padding: 1rem; }
  .user-table th:nth-child(5),
  .user-table td:nth-child(5) { display: none; }
}
@media (max-width: 640px) {
  .stats-grid { grid-template-columns: 1fr; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .search-wrap { min-width: unset; }
}
</style>
