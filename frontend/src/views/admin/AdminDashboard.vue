<template>
  <div class="admin-dashboard">

    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Dashboard Admin</h1>
        <p class="page-subtitle">Ringkasan statistik sistem PAKAR-AIR</p>
      </div>
      <RouterLink to="/admin/users" class="btn-manage">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Kelola Pengguna
      </RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="stats-grid">
      <div class="stat-skeleton" v-for="i in 4" :key="i"></div>
    </div>

    <!-- Stats Cards -->
    <div v-else class="stats-grid">
      <div class="stat-card" v-for="stat in statCards" :key="stat.label">
        <div class="stat-icon-wrap" :style="{ background: stat.iconBg }">
          <span class="stat-icon" :style="{ color: stat.iconColor }">{{ stat.emoji }}</span>
        </div>
        <div class="stat-body">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
        <div class="stat-badge" :style="{ background: stat.badgeBg, color: stat.badgeColor }">
          {{ stat.badge }}
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="section-title-row">
      <h2 class="section-title">Aksi Cepat</h2>
    </div>
    <div class="quick-actions">
      <RouterLink to="/admin/users" class="action-card">
        <div class="action-icon" style="background:#eff6ff;">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2563eb" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div class="action-body">
          <div class="action-title">Kelola Pengguna</div>
          <div class="action-desc">Aktifkan / nonaktifkan / hapus akun</div>
        </div>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </RouterLink>

      <RouterLink to="/admin/reports" class="action-card">
        <div class="action-icon" style="background:#f0fdf4;">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#16a34a" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div class="action-body">
          <div class="action-title">Laporan Analisis</div>
          <div class="action-desc">Lihat & export laporan CSV</div>
        </div>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </RouterLink>
    </div>

    <!-- Error -->
    <div v-if="errorMsg" class="error-banner">{{ errorMsg }}</div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const stats = ref(null)
const isLoading = ref(false)
const errorMsg = ref('')

function getToken() {
  return sessionStorage.getItem('token') || sessionStorage.getItem('pakar_air_token') || ''
}

const statCards = computed(() => {
  if (!stats.value) return []
  const s = stats.value
  return [
    {
      label: 'Total Pengguna',
      value: s.users?.total ?? s.total_users ?? '-',
      emoji: '👥',
      iconBg: 'var(--color-info-bg)',
      iconColor: 'var(--color-accent)',
      badge: 'Pengguna',
      badgeBg: 'var(--color-info-bg)',
      badgeColor: 'var(--color-accent)',
    },
    {
      label: 'Pengguna Aktif',
      value: s.users?.active ?? s.active_users ?? '-',
      emoji: '✅',
      iconBg: 'var(--color-success-bg)',
      iconColor: 'var(--color-success-text)',
      badge: 'Aktif',
      badgeBg: 'var(--color-success-bg)',
      badgeColor: 'var(--color-success-text)',
    },
    {
      label: 'Total Analisis',
      value: s.analyses?.total ?? s.total_analyses ?? '-',
      emoji: '🔬',
      iconBg: 'var(--color-neutral-bg)',
      iconColor: 'var(--color-text-primary)',
      badge: 'Analisis',
      badgeBg: 'var(--color-neutral-bg)',
      badgeColor: 'var(--color-text-primary)',
    },
    {
      label: 'Rata-rata Akurasi',
      value: s.avg_confidence
        ? `${(s.avg_confidence * 100).toFixed(1)}%`
        : s.analyses?.total
          ? `${Math.round((s.results?.layak ?? 0) / s.analyses.total * 100)}%`
          : '-',
      emoji: '📊',
      iconBg: 'var(--color-warning-bg)',
      iconColor: 'var(--color-warning-text)',
      badge: 'Akurasi',
      badgeBg: 'var(--color-warning-bg)',
      badgeColor: 'var(--color-warning-text)',
    },
  ]
})

async function fetchStats() {
  isLoading.value = true
  try {
    const token = sessionStorage.getItem('pakar_air_token') || sessionStorage.getItem('token')
    const res = await axios.get(`${API_BASE}/api/admin/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    stats.value = res.data
  } catch (err) {
    // Kalau endpoint stats gagal, coba hitung manual dari list user
    try {
      const token = sessionStorage.getItem('pakar_air_token') || sessionStorage.getItem('token')
      const usersRes = await axios.get(`${API_BASE}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const users = usersRes.data || []
      stats.value = {
        total_users: users.length,
        active_users: users.filter(u => u.is_active).length,
        total_analyses: '-',
        avg_confidence: null,
      }
    } catch {
      errorMsg.value = 'Gagal memuat statistik.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchStats)
</script>

<style scoped>
.admin-dashboard { max-width: 1100px; }

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}
.page-title { font-size: var(--font-size-xl); font-weight: 700; color: var(--color-text-primary); margin-bottom: 4px; }
.page-subtitle { font-size: var(--font-size-sm); color: var(--color-text-muted); }

.btn-manage {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
}
.btn-manage:hover { background: var(--color-nav-active); text-decoration: none; }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}
.stat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
}
.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon { font-size: 20px; }
.stat-body { flex: 1; }
.stat-value { font-size: var(--font-size-xl); font-weight: 800; color: var(--color-text-primary); line-height: 1.1; }
.stat-label { font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: 2px; }
.stat-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 20px;
  letter-spacing: 0.04em;
}

.stat-skeleton {
  height: 88px;
  background: linear-gradient(90deg, var(--color-neutral-bg) 25%, var(--color-border) 50%, var(--color-neutral-bg) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: var(--radius-lg);
}
@keyframes shimmer { to { background-position: -200% 0; } }

/* Quick actions */
.section-title-row { margin-bottom: 14px; }
.section-title { font-size: var(--font-size-md); font-weight: 700; color: var(--color-text-primary); }
.quick-actions { display: flex; flex-direction: column; gap: 10px; }
.action-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: box-shadow 0.15s, border-color 0.15s;
}
.action-card:hover {
  box-shadow: var(--shadow-card);
  border-color: var(--color-border-dark);
  text-decoration: none;
}
.action-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.action-body { flex: 1; }
.action-title { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-primary); }
.action-desc { font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: 2px; }

.error-banner {
  padding: 12px 16px;
  background: var(--color-danger-bg);
  border: 1px solid var(--color-danger-border);
  border-radius: var(--radius-sm);
  color: var(--color-danger-text);
  font-size: var(--font-size-sm);
  margin-top: 16px;
}
</style>
