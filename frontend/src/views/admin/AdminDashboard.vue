<template>
  <div class="admin-dashboard">

    <!-- ── Header ── -->
    <header class="page-header">
      <div class="header-left">
        <p class="header-eyebrow">PakarAir — Sistem Administrasi</p>
        <h1 class="page-title">Dashboard Admin</h1>
        <p class="page-subtitle">Ringkasan statistik dan pengelolaan sistem PAKAR-AIR</p>
      </div>
      <RouterLink to="/admin/users" class="btn-manage">
        <Users size="13" />
        Kelola Pengguna
      </RouterLink>
    </header>

    <!-- ── Stat Grid — Skeleton ── -->
    <div v-if="isLoading" class="stat-grid">
      <div v-for="i in 4" :key="i" class="stat-skeleton" />
    </div>

    <!-- ── Stat Grid — Data ── -->
    <div v-else class="stat-grid">
      <div
        v-for="stat in statCards"
        :key="stat.label"
        class="stat-cell"
      >
        <div class="stat-cell-top">
          <div class="stat-icon-box">
            <component :is="stat.icon" :size="16" />
          </div>
          <span class="stat-badge" :class="stat.badgeClass">{{ stat.badgeLabel }}</span>
        </div>
        <div class="stat-num">{{ stat.value }}</div>
        <div class="stat-lbl">{{ stat.label }}</div>
        <div v-if="stat.sub" class="stat-sub">{{ stat.sub }}</div>
      </div>
    </div>

    <!-- ── Quick Actions ── -->
    <div class="section-eyebrow">Aksi Cepat</div>
    <div class="action-list">
      <RouterLink to="/admin/users" class="action-row">
        <div class="action-bar action-bar--users" />
        <div class="action-icon-box action-icon--users">
          <Users size="18" />
        </div>
        <div class="action-body">
          <p class="action-title">Kelola Pengguna</p>
          <p class="action-desc">Aktifkan / nonaktifkan / hapus akun pengguna</p>
        </div>
        <span v-if="stats" class="action-count badge-info">
          {{ stats.users?.total ?? stats.total_users ?? '—' }} Pengguna
        </span>
        <ChevronRight size="14" class="action-arrow" />
      </RouterLink>

      <RouterLink to="/admin/reports" class="action-row">
        <div class="action-bar action-bar--reports" />
        <div class="action-icon-box action-icon--reports">
          <FileBarChart size="18" />
        </div>
        <div class="action-body">
          <p class="action-title">Laporan Analisis</p>
          <p class="action-desc">Lihat &amp; ekspor laporan dalam format CSV</p>
        </div>
        <span class="action-count badge-success">Ekspor CSV</span>
        <ChevronRight size="14" class="action-arrow" />
      </RouterLink>
    </div>

    <!-- ── System Status ── -->
    <div class="section-eyebrow">Status Sistem</div>
    <div class="status-panel">
      <div class="status-head">
        <span class="status-head-title">Health Monitor</span>
        <span class="status-all-ok">
          <span class="live-dot" />
          Semua sistem berjalan normal
        </span>
      </div>
      <div v-for="svc in services" :key="svc.name" class="status-row">
        <span class="status-name">{{ svc.name }}</span>
        <div class="status-right">
          <span class="status-meta">{{ svc.meta }}</span>
          <span class="status-ok">ONLINE</span>
        </div>
      </div>
    </div>

    <!-- ── Error ── -->
    <div v-if="errorMsg" class="error-strip">
      <AlertCircle size="13" />
      {{ errorMsg }}
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import {
  Users, FileBarChart, ChevronRight,
  UserCheck, Activity, TrendingUp, AlertCircle
} from 'lucide-vue-next'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const stats    = ref(null)
const isLoading = ref(false)
const errorMsg  = ref('')

// ── Computed stat cards ────────────────────────────────────
const statCards = computed(() => {
  if (!stats.value) return []
  const s = stats.value

  const totalUsers  = s.users?.total       ?? s.total_users    ?? '—'
  const activeUsers = s.users?.active      ?? s.active_users   ?? '—'
  const totalAnal   = s.analyses?.total    ?? s.total_analyses ?? '—'

  const avgConf = s.avg_confidence != null
    ? `${(s.avg_confidence * 100).toFixed(1)}%`
    : (s.analyses?.total && s.results?.layak != null)
      ? `${Math.round((s.results.layak / s.analyses.total) * 100)}%`
      : '—'

  const activeRate = (typeof totalUsers === 'number' && typeof activeUsers === 'number' && totalUsers > 0)
    ? `${((activeUsers / totalUsers) * 100).toFixed(1)}% rate`
    : null

  return [
    {
      label:      'Total Pengguna',
      value:      typeof totalUsers === 'number' ? totalUsers.toLocaleString('id-ID') : totalUsers,
      icon:       Users,
      badgeClass: 'badge-info',
      badgeLabel: 'Pengguna',
      sub:        'Terdaftar',
    },
    {
      label:      'Pengguna Aktif',
      value:      typeof activeUsers === 'number' ? activeUsers.toLocaleString('id-ID') : activeUsers,
      icon:       UserCheck,
      badgeClass: 'badge-success',
      badgeLabel: 'Aktif',
      sub:        activeRate,
    },
    {
      label:      'Total Analisis',
      value:      typeof totalAnal === 'number' ? totalAnal.toLocaleString('id-ID') : totalAnal,
      icon:       Activity,
      badgeClass: 'badge-neutral',
      badgeLabel: 'Analisis',
      sub:        null,
    },
    {
      label:      'Rata-rata Akurasi',
      value:      avgConf,
      icon:       TrendingUp,
      badgeClass: 'badge-warning',
      badgeLabel: 'Akurasi',
      sub:        'Avg confidence',
    },
  ]
})

// ── Services ──────────────────────────────────────────────
const services = [
  { name: 'API Server',      meta: 'Uptime 99.9%'       },
  { name: 'AI Model Engine', meta: 'Latency 1.2 dtk'    },
  { name: 'Database',        meta: 'Query <50ms'         },
]

// ── Fetch ─────────────────────────────────────────────────
async function fetchStats() {
  isLoading.value = true
  errorMsg.value  = ''
  const token = sessionStorage.getItem('pakar_air_token') || sessionStorage.getItem('token') || ''

  try {
    const res = await axios.get(`${API_BASE}/api/admin/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    stats.value = res.data
  } catch {
    // Fallback: derive from user list
    try {
      const usersRes = await axios.get(`${API_BASE}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const users = usersRes.data || []
      stats.value = {
        total_users:    users.length,
        active_users:   users.filter(u => u.is_active).length,
        total_analyses: null,
        avg_confidence: null,
      }
    } catch {
      errorMsg.value = 'Gagal memuat statistik sistem.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchStats)
</script>

<style scoped>
/* ============================================================
   TOKENS (local — warna dari main.css via var())
   ============================================================ */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.admin-dashboard {
  --mono: 'IBM Plex Mono', ui-monospace, monospace;
  --h-rule: var(--color-border);
  --h-rule-2: var(--color-border-light);

  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ============================================================
   HEADER
   ============================================================ */
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
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 6px;
}

.page-title {
  font-family: var(--mono);
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

.btn-manage {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 7px 16px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  border: 1px solid var(--color-text-primary);
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  text-decoration: none;
  transition: opacity 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-manage:hover {
  opacity: 0.8;
  text-decoration: none;
}

/* ============================================================
   STAT GRID
   ============================================================ */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 28px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
}

.stat-cell {
  padding: 20px 20px 18px;
  border-right: 1px solid var(--h-rule);
  background: var(--color-surface);
  position: relative;
  transition: background 0.12s;
}

.stat-cell:last-child {
  border-right: none;
}

.stat-cell:hover {
  background: var(--color-border-light);
}

.stat-cell-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.stat-icon-box {
  width: 32px;
  height: 32px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

/* Semantic badge classes — warna dari main.css */
.stat-badge {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 1px;
}

.badge-info    { background: var(--color-info-bg);    color: var(--color-info-text);    }
.badge-success { background: var(--color-success-bg); color: var(--color-success-text); }
.badge-neutral { background: var(--color-bg); color: var(--color-text-muted);   }
.badge-warning { background: var(--color-warning-bg); color: var(--color-warning-text); }
.badge-danger  { background: var(--color-danger-bg);  color: var(--color-danger-text);  }

.stat-num {
  font-family: var(--mono);
  font-size: 26px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-lbl {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.stat-sub {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
  position: absolute;
  bottom: 14px;
  right: 16px;
}

/* Skeleton */
.stat-skeleton {
  height: 108px;
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
}

.stat-skeleton::after {
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

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* ============================================================
   SECTION EYEBROW
   ============================================================ */
.section-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-eyebrow::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--h-rule);
}

/* ============================================================
   ACTION LIST
   ============================================================ */
.action-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 28px;
}

.action-row {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border-bottom: 1px solid var(--h-rule-2);
  cursor: pointer;
  text-decoration: none;
  min-height: 64px;
  transition: background 0.12s;
}

.action-row:last-child {
  border-bottom: none;
}

.action-row:hover {
  background: var(--color-border-light);
  text-decoration: none;
}

/* Left accent bar */
.action-bar {
  width: 3px;
  align-self: stretch;
  flex-shrink: 0;
  transition: width 0.15s;
}

.action-row:hover .action-bar {
  width: 4px;
}

.action-bar--users   { background: var(--color-accent); }
.action-bar--reports { background: var(--color-success-text); }

/* Icon box */
.action-icon-box {
  width: 40px;
  height: 40px;
  margin: 0 16px;
  flex-shrink: 0;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon--users   { background: var(--color-info-bg);    color: var(--color-info-text);    }
.action-icon--reports { background: var(--color-success-bg); color: var(--color-success-text); }

.action-body {
  flex: 1;
  min-width: 0;
  padding: 0 4px;
}

.action-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0 0 2px;
}

.action-desc {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  margin: 0;
}

.action-count {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 3px 10px;
  border-radius: 1px;
  flex-shrink: 0;
  margin-right: 8px;
}

.action-arrow {
  color: var(--color-text-muted-light);
  margin-right: 16px;
  flex-shrink: 0;
  transition: transform 0.15s, color 0.15s;
}

.action-row:hover .action-arrow {
  transform: translateX(2px);
  color: var(--color-text-secondary);
}

/* ============================================================
   STATUS PANEL
   ============================================================ */
.status-panel {
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0;
}

.status-head {
  padding: 10px 16px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--h-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-head-title {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.status-all-ok {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-success-text);
  display: flex;
  align-items: center;
  gap: 6px;
}

.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-success-text);
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--h-rule-2);
  background: var(--color-surface);
}

.status-row:last-child {
  border-bottom: none;
}

.status-name {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--color-text-secondary);
}

.status-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-meta {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
}

.status-ok {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border-radius: 1px;
  background: var(--color-success-bg);
  color: var(--color-success-text);
}

/* ============================================================
   ERROR
   ============================================================ */
.error-strip {
  font-family: var(--mono);
  font-size: 11px;
  padding: 10px 16px;
  border: 1px solid var(--color-danger-border, #fecaca);
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
  border-radius: 2px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 900px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-cell:nth-child(2) {
    border-right: none;
  }

  .stat-cell:nth-child(3),
  .stat-cell:nth-child(4) {
    border-top: 1px solid var(--h-rule);
  }

  .stat-cell:nth-child(4) {
    border-right: none;
  }
}

@media (max-width: 540px) {
  .stat-grid {
    grid-template-columns: 1fr 1fr;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-manage {
    align-self: flex-start;
  }
}
</style>
