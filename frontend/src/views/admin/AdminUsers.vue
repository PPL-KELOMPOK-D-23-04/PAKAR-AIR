<template>
  <div class="admin-users">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Kelola Pengguna</h1>
        <p class="page-subtitle">Aktifkan atau nonaktifkan akun pengguna yang terdaftar</p>
      </div>
      <div class="header-stats">
        <div class="stat-pill stat-pill--total">
          <span class="stat-dot stat-dot--blue"></span>
          {{ users.length }} Total
        </div>
        <div class="stat-pill stat-pill--active">
          <span class="stat-dot stat-dot--green"></span>
          {{ activeCount }} Aktif
        </div>
        <div class="stat-pill stat-pill--inactive">
          <span class="stat-dot stat-dot--red"></span>
          {{ inactiveCount }} Nonaktif
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="search-wrap">
        <svg class="search-icon" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama atau username..."
          class="search-input"
        />
      </div>
      <div class="filter-wrap">
        <select v-model="filterStatus" class="filter-select">
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
        </select>
      </div>
      <button class="btn-refresh" @click="fetchUsers" :disabled="isLoading">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          :class="{ 'spin': isLoading }">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </button>
    </div>

    <!-- Error State -->
    <div v-if="errorMsg" class="error-banner">
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {{ errorMsg }}
      <button @click="errorMsg = ''" class="error-close">✕</button>
    </div>

    <!-- Success Toast -->
    <Transition name="toast">
      <div v-if="successMsg" class="success-toast">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {{ successMsg }}
      </div>
    </Transition>

    <!-- Loading Skeleton -->
    <div v-if="isLoading && users.length === 0" class="table-card">
      <div class="skeleton-row" v-for="i in 5" :key="i"></div>
    </div>

    <!-- Table -->
    <div v-else-if="filteredUsers.length > 0" class="table-card">
      <table class="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Pengguna</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Bergabung</th>
            <th class="th-action">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id" :class="{ 'row-inactive': !user.is_active }">
            <!-- Nomor urut -->
            <td><span style="color:#94a3b8; font-size:12px;">{{ index + 1 }}</span></td>
            <!-- Avatar + Name -->
            <td>
              <div class="user-cell">
                <div class="user-avatar" :style="{ background: avatarColor(user.full_name) }">
                  {{ initials(user.full_name) }}
                </div>
                <div>
                  <div class="user-name">{{ user.full_name }}</div>
                </div>
              </div>
            </td>

            <!-- Username -->
            <td>
              <span class="username-text">@{{ user.username }}</span>
            </td>

            <!-- Role -->
            <td>
              <span class="badge" :class="user.is_admin ? 'badge--admin' : 'badge--user'">
                {{ user.is_admin ? 'Admin' : 'Pengguna' }}
              </span>
            </td>

            <!-- Status -->
            <td>
              <span class="badge" :class="user.is_active ? 'badge--active' : 'badge--inactive'">
                <span class="status-dot" :class="user.is_active ? 'dot--active' : 'dot--inactive'"></span>
                {{ user.is_active ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>

            <!-- Joined -->
            <td>
              <span class="date-text">{{ formatDate(user.created_at) }}</span>
            </td>

            <!-- Action -->
            <td>
              <div class="action-group">
                <!-- Toggle Status -->
                <button
                  v-if="!user.is_admin"
                  @click="confirmToggle(user)"
                  :disabled="actionLoading === user.id"
                  class="btn-action"
                  :class="user.is_active ? 'btn-action--disable' : 'btn-action--enable'"
                  :title="user.is_active ? 'Nonaktifkan akun' : 'Aktifkan akun'"
                >
                  <span v-if="actionLoading === user.id" class="btn-spinner"></span>
                  <template v-else>
                    <svg v-if="user.is_active" width="14" height="14" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <svg v-else width="14" height="14" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ user.is_active ? 'Nonaktifkan' : 'Aktifkan' }}
                  </template>
                </button>

                <!-- Delete -->
                <button
                  v-if="!user.is_admin"
                  @click="confirmDelete(user)"
                  :disabled="actionLoading === user.id"
                  class="btn-action btn-action--delete"
                  title="Hapus akun"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus
                </button>

                <!-- Protected Admin -->
                <span v-if="user.is_admin" class="protected-label">
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Dilindungi
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">👥</div>
      <p class="empty-title">Tidak ada pengguna ditemukan</p>
      <p class="empty-sub">Coba ubah filter atau kata kunci pencarian</p>
    </div>

    <!-- Confirm Modal -->
    <Transition name="modal">
      <div v-if="modal.show" class="modal-overlay" @click.self="modal.show = false">
        <div class="modal">
          <div class="modal-icon" :class="modal.type === 'delete' ? 'modal-icon--danger' : modal.type === 'disable' ? 'modal-icon--warn' : 'modal-icon--success'">
            <svg v-if="modal.type === 'delete'" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <svg v-else-if="modal.type === 'disable'" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <svg v-else width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="modal-title">{{ modal.title }}</h3>
          <p class="modal-desc">{{ modal.desc }}</p>
          <div class="modal-actions">
            <button class="btn-modal btn-modal--cancel" @click="modal.show = false">Batal</button>
            <button
              class="btn-modal"
              :class="modal.type === 'delete' ? 'btn-modal--danger' : modal.type === 'disable' ? 'btn-modal--warn' : 'btn-modal--success'"
              @click="executeAction"
              :disabled="actionLoading"
            >
              <span v-if="actionLoading" class="btn-spinner btn-spinner--white"></span>
              <span v-else>{{ modal.confirmLabel }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// ── State ──────────────────────────────────────────────────────
const users = ref([])
const isLoading = ref(false)
const actionLoading = ref(null) // user.id yang sedang diproses
const errorMsg = ref('')
const successMsg = ref('')
const searchQuery = ref('')
const filterStatus = ref('all')

const modal = ref({
  show: false,
  type: '',       // 'disable' | 'enable' | 'delete'
  title: '',
  desc: '',
  confirmLabel: '',
  targetUser: null,
})

// ── Computed ───────────────────────────────────────────────────
const activeCount = computed(() => users.value.filter(u => u.is_active).length)
const inactiveCount = computed(() => users.value.filter(u => !u.is_active).length)

const filteredUsers = computed(() => {
  return [...users.value].sort((a, b) => 
    new Date(a.created_at) - new Date(b.created_at)
  ).filter(u => {
    const q = searchQuery.value.toLowerCase()
    const matchSearch =
      u.full_name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q)
    const matchFilter =
      filterStatus.value === 'all' ||
      (filterStatus.value === 'active' && u.is_active) ||
      (filterStatus.value === 'inactive' && !u.is_active)
    return matchSearch && matchFilter
  })
})

// ── Helpers ────────────────────────────────────────────────────
function getToken() {
  return sessionStorage.getItem('token') || sessionStorage.getItem('pakar_air_token') || ''
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` }
}

function initials(name) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].substring(0, 2).toUpperCase()
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4']
function avatarColor(name) {
  if (!name) return '#94a3b8'
  const idx = name.charCodeAt(0) % COLORS.length
  return COLORS[idx]
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

function showSuccess(msg) {
  successMsg.value = msg
  setTimeout(() => { successMsg.value = '' }, 3000)
}

// ── API Calls ──────────────────────────────────────────────────
async function fetchUsers() {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const res = await axios.get(`${API_BASE}/api/admin/users`, {
      headers: authHeaders()
    })
    users.value = res.data
  } catch (err) {
    errorMsg.value = err.response?.data?.detail || 'Gagal memuat data pengguna.'
  } finally {
    isLoading.value = false
  }
}

async function executeAction() {
  const user = modal.value.targetUser
  if (!user) return

  actionLoading.value = user.id
  modal.value.show = false

  try {
    if (modal.value.type === 'delete') {
      await axios.delete(`${API_BASE}/api/admin/users/${user.id}`, {
        headers: authHeaders()
      })
      users.value = users.value.filter(u => u.id !== user.id)
      showSuccess(`Akun ${user.full_name} berhasil dihapus.`)
    } else {
      const newStatus = modal.value.type === 'enable'
      await axios.put(
        `${API_BASE}/api/admin/users/${user.id}/status?is_active=${newStatus}`,
        {},
        { headers: authHeaders() }
      )
      const idx = users.value.findIndex(u => u.id === user.id)
      if (idx !== -1) users.value[idx].is_active = newStatus
      showSuccess(
        newStatus
          ? `Akun ${user.full_name} berhasil diaktifkan.`
          : `Akun ${user.full_name} berhasil dinonaktifkan.`
      )
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.detail || 'Gagal menjalankan aksi.'
  } finally {
    actionLoading.value = null
  }
}

// ── Modal helpers ──────────────────────────────────────────────
function confirmToggle(user) {
  if (user.is_active) {
    modal.value = {
      show: true,
      type: 'disable',
      title: 'Nonaktifkan Akun?',
      desc: `Akun "${user.full_name}" akan dinonaktifkan. Pengguna tidak dapat login hingga diaktifkan kembali.`,
      confirmLabel: 'Nonaktifkan',
      targetUser: user,
    }
  } else {
    modal.value = {
      show: true,
      type: 'enable',
      title: 'Aktifkan Akun?',
      desc: `Akun "${user.full_name}" akan diaktifkan kembali dan pengguna dapat login.`,
      confirmLabel: 'Aktifkan',
      targetUser: user,
    }
  }
}

function confirmDelete(user) {
  modal.value = {
    show: true,
    type: 'delete',
    title: 'Hapus Akun Pengguna?',
    desc: `Akun "${user.full_name}" akan dihapus permanen beserta semua riwayat analisisnya. Tindakan ini tidak dapat dibatalkan.`,
    confirmLabel: 'Hapus Permanen',
    targetUser: user,
  }
}

// ── Lifecycle ──────────────────────────────────────────────────
onMounted(fetchUsers)
</script>

<style scoped>
.admin-users {
  max-width: 1200px;
  position: relative;
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}
.page-subtitle {
  font-size: 13px;
  color: #64748b;
}
.header-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.stat-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: #fff;
  border: 1px solid #e2e8f0;
  color: #475569;
}
.stat-dot { width: 8px; height: 8px; border-radius: 50%; }
.stat-dot--blue { background: #3b82f6; }
.stat-dot--green { background: #22c55e; }
.stat-dot--red { background: #ef4444; }

/* ── Toolbar ── */
.toolbar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}
.search-input {
  width: 100%;
  padding: 9px 12px 9px 36px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  background: #fff;
  color: #1e293b;
  outline: none;
  transition: border-color 0.15s;
}
.search-input:focus { border-color: #3b82f6; }
.filter-select {
  padding: 9px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  background: #fff;
  color: #1e293b;
  outline: none;
  cursor: pointer;
}
.btn-refresh {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-refresh:hover { background: #f8fafc; }
.btn-refresh:disabled { opacity: 0.6; }

.spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Error / Success ── */
.error-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 13px;
  margin-bottom: 16px;
}
.error-close {
  margin-left: auto;
  background: none;
  border: none;
  color: #b91c1c;
  cursor: pointer;
  font-size: 14px;
}

.success-toast {
  position: fixed;
  top: 24px;
  right: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #0f172a;
  color: #fff;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  z-index: 999;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
.toast-enter-active, .toast-leave-active { transition: all 0.3s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-12px); }

/* ── Skeleton ── */
.skeleton-row {
  height: 52px;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 6px;
  margin-bottom: 4px;
}
@keyframes shimmer { to { background-position: -200% 0; } }

/* ── Table Card ── */
.table-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.users-table {
  width: 100%;
  border-collapse: collapse;
}
.users-table thead tr {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.users-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
  white-space: nowrap;
}
.th-action { text-align: right; }
.users-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.12s;
}
.users-table tbody tr:last-child { border-bottom: none; }
.users-table tbody tr:hover { background: #fafbfc; }
.users-table tbody tr.row-inactive { background: #fafafa; }
.users-table td {
  padding: 12px 16px;
  vertical-align: middle;
}

/* ── Cells ── */
.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-name { font-size: 13px; font-weight: 600; color: #0f172a; }
.username-text { font-size: 12px; color: #64748b; }
.date-text { font-size: 12px; color: #94a3b8; }

/* ── Badges ── */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
.badge--admin { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.badge--user { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
.badge--active { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.badge--inactive { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.dot--active { background: #22c55e; }
.dot--inactive { background: #ef4444; }

/* ── Actions ── */
.action-group {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
}
.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.btn-action:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-action--disable {
  background: #fef3c7;
  color: #92400e;
  border-color: #fde68a;
}
.btn-action--disable:hover:not(:disabled) {
  background: #fde68a;
}
.btn-action--enable {
  background: #f0fdf4;
  color: #15803d;
  border-color: #bbf7d0;
}
.btn-action--enable:hover:not(:disabled) {
  background: #dcfce7;
}
.btn-action--delete {
  background: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}
.btn-action--delete:hover:not(:disabled) {
  background: #fee2e2;
}

.protected-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #94a3b8;
  padding: 6px 10px;
}

.btn-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.btn-spinner--white { border-color: rgba(255,255,255,0.5); border-top-color: transparent; }

/* ── Empty ── */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}
.empty-icon { font-size: 48px; margin-bottom: 16px; }
.empty-title { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 6px; }
.empty-sub { font-size: 13px; color: #64748b; }

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  padding: 20px;
}
.modal {
  background: #fff;
  border-radius: 16px;
  padding: 28px 28px 24px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0,0,0,0.15);
}
.modal-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.modal-icon--danger { background: #fef2f2; color: #b91c1c; }
.modal-icon--warn { background: #fffbeb; color: #92400e; }
.modal-icon--success { background: #f0fdf4; color: #15803d; }
.modal-title { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
.modal-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 24px; }
.modal-actions { display: flex; gap: 10px; }
.btn-modal {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.15s;
}
.btn-modal:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-modal--cancel { background: #f1f5f9; color: #475569; }
.btn-modal--cancel:hover { background: #e2e8f0; }
.btn-modal--danger { background: #ef4444; color: #fff; }
.btn-modal--danger:hover { background: #dc2626; }
.btn-modal--warn { background: #f59e0b; color: #fff; }
.btn-modal--warn:hover { background: #d97706; }
.btn-modal--success { background: #22c55e; color: #fff; }
.btn-modal--success:hover { background: #16a34a; }

/* Modal transition */
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
</style>
