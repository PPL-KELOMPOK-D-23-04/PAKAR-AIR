<template>
  <div class="admin-users">

    <!-- ── Header ── -->
    <header class="page-header">
      <div class="header-left">
        <p class="header-eyebrow">PakarAir — Sistem Administrasi</p>
        <h1 class="page-title">Kelola Pengguna</h1>
        <p class="page-subtitle">Aktifkan atau nonaktifkan akun pengguna yang terdaftar</p>
      </div>
      <div class="header-stats">
        <div class="stat-pill">
          <span class="stat-dot stat-dot--blue"></span>
          <span class="mono">{{ users.length }}</span> Total
        </div>
        <div class="stat-pill">
          <span class="stat-dot stat-dot--green"></span>
          <span class="mono">{{ activeCount }}</span> Aktif
        </div>
        <div class="stat-pill">
          <span class="stat-dot stat-dot--red"></span>
          <span class="mono">{{ inactiveCount }}</span> Nonaktif
        </div>
      </div>
    </header>

    <!-- ── Toolbar ── -->
    <div class="toolbar">
      <div class="search-wrap">
        <svg class="search-icon" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama atau username..."
          class="search-input"
        />
      </div>
      <select v-model="filterStatus" class="filter-select">
        <option value="all">Semua Status</option>
        <option value="active">Aktif</option>
        <option value="inactive">Nonaktif</option>
      </select>
      <button class="btn-refresh" @click="fetchUsers" :disabled="isLoading">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
          :class="{ 'spin': isLoading }">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </button>
    </div>

    <!-- ── Error ── -->
    <div v-if="errorMsg" class="error-strip">
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {{ errorMsg }}
      <button @click="errorMsg = ''" class="error-close">✕</button>
    </div>

    <!-- ── Success Toast ── -->
    <Transition name="toast">
      <div v-if="successMsg" class="success-toast">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {{ successMsg }}
      </div>
    </Transition>

    <!-- ── Skeleton ── -->
    <div v-if="isLoading && users.length === 0" class="table-card">
      <div class="skeleton-row" v-for="i in 5" :key="i" />
    </div>

    <!-- ── Table ── -->
    <div v-else-if="filteredUsers.length > 0" class="table-card">
      <table class="users-table">
        <thead>
          <tr>
            <th class="th-num">#</th>
            <th>Pengguna</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Bergabung</th>
            <th class="th-action">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in filteredUsers"
            :key="user.id"
            :class="{ 'row-inactive': !user.is_active }"
          >
            <td><span class="cell-num">{{ index + 1 }}</span></td>

            <td>
              <div class="user-cell">
                <div class="user-avatar" :style="{ background: avatarColor(user.full_name) }">
                  {{ initials(user.full_name) }}
                </div>
                <span class="user-name">{{ user.full_name }}</span>
              </div>
            </td>

            <td><span class="username-text">@{{ user.username }}</span></td>

            <td>
              <span class="badge" :class="user.is_admin ? 'badge--admin' : 'badge--user'">
                {{ user.is_admin ? 'Admin' : 'Pengguna' }}
              </span>
            </td>

            <td>
              <span class="badge" :class="user.is_active ? 'badge--active' : 'badge--inactive'">
                <span class="sdot" :class="user.is_active ? 'sdot--on' : 'sdot--off'"></span>
                {{ user.is_active ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>

            <td><span class="date-text">{{ formatDate(user.created_at) }}</span></td>

            <td>
              <div class="action-group">
                <button
                  v-if="!user.is_admin"
                  @click="confirmToggle(user)"
                  :disabled="actionLoading === user.id"
                  class="btn-act"
                  :class="user.is_active ? 'btn-act--disable' : 'btn-act--enable'"
                >
                  <span v-if="actionLoading === user.id" class="btn-spinner" />
                  <template v-else>
                    <svg v-if="user.is_active" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <svg v-else width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ user.is_active ? 'Nonaktifkan' : 'Aktifkan' }}
                  </template>
                </button>

                <button
                  v-if="!user.is_admin"
                  @click="confirmDelete(user)"
                  :disabled="actionLoading === user.id"
                  class="btn-act btn-act--delete"
                >
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus
                </button>

                <span v-if="user.is_admin" class="protected-label">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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

    <!-- ── Empty ── -->
    <div v-else class="empty-state">
      <p class="empty-title">Tidak ada pengguna ditemukan</p>
      <p class="empty-sub">Coba ubah filter atau kata kunci pencarian</p>
    </div>

    <!-- ── Confirm Modal ── -->
    <Transition name="modal">
      <div v-if="modal.show" class="modal-overlay" @click.self="modal.show = false">
        <div class="modal">
          <div
            class="modal-icon-box"
            :class="{
              'modal-icon--danger': modal.type === 'delete',
              'modal-icon--warn':   modal.type === 'disable',
              'modal-icon--success':modal.type === 'enable',
            }"
          >
            <svg v-if="modal.type === 'delete'" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <svg v-else-if="modal.type === 'disable'" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <svg v-else width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="modal-title">{{ modal.title }}</p>
          <p class="modal-desc">{{ modal.desc }}</p>
          <div class="modal-actions">
            <button class="btn-modal btn-modal--cancel" @click="modal.show = false">Batal</button>
            <button
              class="btn-modal"
              :class="{
                'btn-modal--danger':  modal.type === 'delete',
                'btn-modal--warn':    modal.type === 'disable',
                'btn-modal--success': modal.type === 'enable',
              }"
              @click="executeAction"
              :disabled="!!actionLoading"
            >
              <span v-if="actionLoading" class="btn-spinner btn-spinner--white" />
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

const users         = ref([])
const isLoading     = ref(false)
const actionLoading = ref(null)
const errorMsg      = ref('')
const successMsg    = ref('')
const searchQuery   = ref('')
const filterStatus  = ref('all')

const modal = ref({
  show: false, type: '', title: '', desc: '', confirmLabel: '', targetUser: null,
})

const activeCount   = computed(() => users.value.filter(u => u.is_active).length)
const inactiveCount = computed(() => users.value.filter(u => !u.is_active).length)

const filteredUsers = computed(() =>
  [...users.value]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .filter(u => {
      const q = searchQuery.value.toLowerCase()
      const matchSearch = u.full_name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
      const matchFilter =
        filterStatus.value === 'all' ||
        (filterStatus.value === 'active'   &&  u.is_active) ||
        (filterStatus.value === 'inactive' && !u.is_active)
      return matchSearch && matchFilter
    })
)

function getToken() {
  return sessionStorage.getItem('token') || sessionStorage.getItem('pakar_air_token') || ''
}
function authHeaders() { return { Authorization: `Bearer ${getToken()}` } }

function initials(name) {
  if (!name) return '?'
  const p = name.trim().split(' ')
  return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : p[0].substring(0, 2).toUpperCase()
}

const COLORS = ['var(--color-accent)', 'var(--color-success-text)', 'var(--color-danger-text)', 'var(--color-warning-text)', 'var(--color-info-text)']
function avatarColor(name) {
  if (!name) return 'var(--color-text-muted-light)'
  return COLORS[name.charCodeAt(0) % COLORS.length]
}

function formatDate(d) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function showSuccess(msg) {
  successMsg.value = msg
  setTimeout(() => { successMsg.value = '' }, 3000)
}

async function fetchUsers() {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const res = await axios.get(`${API_BASE}/api/admin/users`, { headers: authHeaders() })
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
      await axios.delete(`${API_BASE}/api/admin/users/${user.id}`, { headers: authHeaders() })
      users.value = users.value.filter(u => u.id !== user.id)
      showSuccess(`Akun ${user.full_name} berhasil dihapus.`)
    } else {
      const newStatus = modal.value.type === 'enable'
      await axios.put(
        `${API_BASE}/api/admin/users/${user.id}/status?is_active=${newStatus}`,
        {}, { headers: authHeaders() }
      )
      const idx = users.value.findIndex(u => u.id === user.id)
      if (idx !== -1) users.value[idx].is_active = newStatus
      showSuccess(newStatus
        ? `Akun ${user.full_name} berhasil diaktifkan.`
        : `Akun ${user.full_name} berhasil dinonaktifkan.`)
    }
  } catch (err) {
    errorMsg.value = err.response?.data?.detail || 'Gagal menjalankan aksi.'
  } finally {
    actionLoading.value = null
  }
}

function confirmToggle(user) {
  modal.value = user.is_active
    ? { show: true, type: 'disable', title: 'Nonaktifkan Akun?',
        desc: `Akun "${user.full_name}" akan dinonaktifkan. Pengguna tidak dapat login hingga diaktifkan kembali.`,
        confirmLabel: 'Nonaktifkan', targetUser: user }
    : { show: true, type: 'enable', title: 'Aktifkan Akun?',
        desc: `Akun "${user.full_name}" akan diaktifkan kembali dan pengguna dapat login.`,
        confirmLabel: 'Aktifkan', targetUser: user }
}

function confirmDelete(user) {
  modal.value = {
    show: true, type: 'delete', title: 'Hapus Akun Pengguna?',
    desc: `Akun "${user.full_name}" akan dihapus permanen beserta semua riwayat analisisnya. Tindakan ini tidak dapat dibatalkan.`,
    confirmLabel: 'Hapus Permanen', targetUser: user,
  }
}

onMounted(fetchUsers)
</script>

<style scoped>


.admin-users {
  
  --h-rule: var(--color-border);
  --h-rule-2: var(--color-border-light);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Header ── */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--color-text-primary);
  flex-wrap: wrap;
}
.header-eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 6px;
}
.page-title {
  font-family: var(--font-sans);
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0 0 5px;
}
.page-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}
.header-stats {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.stat-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
  background: var(--color-surface);
}
.stat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.stat-dot--blue  { background: var(--color-accent); }
.stat-dot--green { background: var(--color-success-text); }
.stat-dot--red   { background: var(--color-danger-text); }
.mono { font-family: var(--font-mono); }

/* ── Toolbar ── */
.toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  align-items: center;
}
.search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
}
.search-icon {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted-light);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 8px 11px 8px 32px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  background: var(--color-surface);
  color: var(--color-text-primary);
  outline: none;
  transition: border-color 0.15s;
  letter-spacing: 0.02em;
}
.search-input::placeholder { color: var(--color-text-muted-light); }
.search-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.filter-select {
  padding: 8px 11px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  outline: none;
  cursor: pointer;
  letter-spacing: 0.04em;
}
.btn-refresh {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--color-surface);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background 0.12s;
}
.btn-refresh:hover:not(:disabled) { background: var(--color-border-light); }
.btn-refresh:disabled { opacity: 0.5; cursor: not-allowed; }
.spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Error / Toast ── */
.error-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid var(--color-danger-border);
  border-radius: 2px;
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
  font-family: var(--font-mono);
  font-size: 11px;
  margin-bottom: 14px;
}
.error-close {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--color-danger-text);
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
}
.success-toast {
  position: fixed;
  top: 24px;
  right: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  z-index: 999;
}
.toast-enter-active, .toast-leave-active { transition: all 0.25s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-10px); }

/* ── Skeleton ── */
.skeleton-row {
  height: 48px;
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--h-rule-2);
}
.skeleton-row::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--color-border) 60%, transparent) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

/* ── Table ── */
.table-card {
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
  background: var(--color-surface);
}
.users-table {
  width: 100%;
  border-collapse: collapse;
}
.users-table thead tr {
  background: var(--color-bg);
  border-bottom: 1px solid var(--h-rule);
}
.users-table th {
  padding: 10px 14px;
  text-align: left;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  white-space: nowrap;
}
.th-num   { width: 40px; }
.th-action { text-align: right; }
.users-table tbody tr {
  border-bottom: 1px solid var(--h-rule-2);
  transition: background 0.1s;
}
.users-table tbody tr:last-child { border-bottom: none; }
.users-table tbody tr:hover { background: var(--color-bg); }
.users-table tbody tr.row-inactive { opacity: 0.65; }
.users-table td {
  padding: 11px 14px;
  vertical-align: middle;
}

/* ── Cells ── */
.cell-num {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
}
.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: var(--color-surface);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-name {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 13px;
  color: var(--color-text-primary);
  line-height: 1.2;
}
.user-email {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 400;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}
.date-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
}

/* ── Badges ── */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid transparent;
}
.badge--admin    { background: var(--color-info-bg);    color: var(--color-info-text);    border: 1px solid var(--color-info-border); }
.badge--user     { background: var(--color-bg); color: var(--color-text-muted);   border: 1px solid var(--h-rule); }
.badge--active   { background: var(--color-success-bg); color: var(--color-success-text); border: 1px solid var(--color-success-border); }
.badge--inactive { background: var(--color-danger-bg);  color: var(--color-danger-text);  border: 1px solid var(--color-danger-border); }

.sdot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.sdot--on  { background: var(--color-success-text); }
.sdot--off { background: var(--color-danger-text); }

/* ── Action ── */
.action-group {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
}
.btn-act {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.12s;
  white-space: nowrap;
}
.btn-act:disabled { opacity: 0.45; cursor: not-allowed; }
.btn-act--disable {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border-color: var(--color-warning-border);
}
.btn-act--disable:hover:not(:disabled) { background: var(--color-warning-border); }
.btn-act--enable {
  background: var(--color-success-bg);
  color: var(--color-success-text);
  border-color: var(--color-success-border);
}
.btn-act--enable:hover:not(:disabled) { background: var(--color-success-border); }
.btn-act--delete {
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
  border-color: var(--color-danger-border);
}
.btn-act--delete:hover:not(:disabled) { background: var(--color-danger-border); }

.protected-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
  padding: 5px 8px;
  letter-spacing: 0.04em;
}
.btn-spinner {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1.5px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.btn-spinner--white { border-color: rgba(255,255,255,0.5); border-top-color: transparent; }

/* ── Empty ── */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  background: var(--color-surface);
}
.empty-title {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}
.empty-sub {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
}

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
  padding: 20px;
}
.modal {
  background: var(--color-surface);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  padding: 28px 28px 24px;
  width: 100%;
  max-width: 380px;
  text-align: center;
}
.modal-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.modal-icon--danger  { background: var(--color-danger-bg);  color: var(--color-danger-text); }
.modal-icon--warn    { background: var(--color-warning-bg); color: var(--color-warning-text); }
.modal-icon--success { background: var(--color-success-bg); color: var(--color-success-text); }
.modal-title {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}
.modal-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-bottom: 24px;
}
.modal-actions { display: flex; gap: 8px; }
.btn-modal {
  flex: 1;
  padding: 9px;
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: opacity 0.15s;
}
.btn-modal:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-modal--cancel  { background: var(--color-bg); color: var(--color-text-muted); border: 1px solid var(--h-rule); }
.btn-modal--cancel:hover { background: var(--color-border); }
.btn-modal--danger  { background: var(--color-danger-text);  color: var(--color-surface); }
.btn-modal--danger:hover  { opacity: 0.88; }
.btn-modal--warn    { background: var(--color-warning-text); color: var(--color-surface); }
.btn-modal--warn:hover    { opacity: 0.88; }
.btn-modal--success { background: var(--color-success-text); color: var(--color-surface); }
.btn-modal--success:hover { opacity: 0.88; }

.modal-enter-active, .modal-leave-active { transition: all 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.97); }

/* ── Responsive ── */
@media (max-width: 640px) {
  .page-header { flex-direction: column; align-items: flex-start; }
  .users-table th:nth-child(6),
  .users-table td:nth-child(6) { display: none; }
}
</style>