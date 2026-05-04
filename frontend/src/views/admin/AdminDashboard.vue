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
  return localStorage.getItem('token') || localStorage.getItem('pakar_air_token') || ''
}

const statCards = computed(() => {
  if (!stats.value) return []
  const s = stats.value
  return [
    {
      label: 'Total Pengguna',
      value: s.users?.total ?? s.total_users ?? '-',
      emoji: '👥',
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
      badge: 'Pengguna',
      badgeBg: '#eff6ff',
      badgeColor: '#2563eb',
    },
    {
      label: 'Pengguna Aktif',
      value: s.users?.active ?? s.active_users ?? '-',
      emoji: '✅',
      iconBg: '#f0fdf4',
      iconColor: '#16a34a',
      badge: 'Aktif',
      badgeBg: '#f0fdf4',
      badgeColor: '#16a34a',
    },
    {
      label: 'Total Analisis',
      value: s.analyses?.total ?? s.total_analyses ?? '-',
      emoji: '🔬',
      iconBg: '#faf5ff',
      iconColor: '#7c3aed',
      badge: 'Analisis',
      badgeBg: '#faf5ff',
      badgeColor: '#7c3aed',
    },
    {
      label: 'Rata-rata Akurasi',
      value: s.avg_confidence
        ? `${(s.avg_confidence * 100).toFixed(1)}%`
        : s.analyses?.total
          ? `${Math.round((s.results?.layak ?? 0) / s.analyses.total * 100)}%`
          : '-',
      emoji: '📊',
      iconBg: '#fff7ed',
      iconColor: '#c2410c',
      badge: 'Akurasi',
      badgeBg: '#fff7ed',
      badgeColor: '#c2410c',
    },
  ]
})

async function fetchStats() {
  isLoading.value = true
  try {
    const token = localStorage.getItem('pakar_air_token') || localStorage.getItem('token')
    const res = await axios.get(`${API_BASE}/api/admin/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    stats.value = res.data
  } catch (err) {
    // Kalau endpoint stats gagal, coba hitung manual dari list user
    try {
      const token = localStorage.getItem('pakar_air_token') || localStorage.getItem('token')
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
.page-title { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.page-subtitle { font-size: 13px; color: #64748b; }

.btn-manage {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: #0f172a;
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
}
.btn-manage:hover { background: #1e293b; text-decoration: none; }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}
.stat-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
}
.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon { font-size: 20px; }
.stat-body { flex: 1; }
.stat-value { font-size: 22px; font-weight: 800; color: #0f172a; line-height: 1.1; }
.stat-label { font-size: 12px; color: #64748b; margin-top: 2px; }
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
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 12px;
}
@keyframes shimmer { to { background-position: -200% 0; } }

/* Quick actions */
.section-title-row { margin-bottom: 14px; }
.section-title { font-size: 15px; font-weight: 700; color: #0f172a; }
.quick-actions { display: flex; flex-direction: column; gap: 10px; }
.action-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  text-decoration: none;
  transition: box-shadow 0.15s, border-color 0.15s;
}
.action-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border-color: #cbd5e1;
  text-decoration: none;
}
.action-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.action-body { flex: 1; }
.action-title { font-size: 14px; font-weight: 600; color: #0f172a; }
.action-desc { font-size: 12px; color: #64748b; margin-top: 2px; }

.error-banner {
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 13px;
  margin-top: 16px;
}
</style>
