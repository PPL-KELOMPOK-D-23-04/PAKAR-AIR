<template>
  <div class="admin-reports">

    <div class="page-header">
      <div>
        <h1 class="page-title">Laporan Analisis</h1>
        <p class="page-subtitle">Filter dan export data analisis kualitas air</p>
      </div>
      <button class="btn-export" @click="exportCSV" :disabled="isExporting || reports.length === 0">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {{ isExporting ? 'Mengekspor...' : 'Export CSV' }}
      </button>
    </div>

    <!-- Filter -->
    <div class="filter-bar">
      <div class="filter-group">
        <label class="filter-label">Dari Tanggal</label>
        <input v-model="filters.dateFrom" type="date" class="filter-input" />
      </div>
      <div class="filter-group">
        <label class="filter-label">Sampai Tanggal</label>
        <input v-model="filters.dateTo" type="date" class="filter-input" />
      </div>
      <div class="filter-group">
        <label class="filter-label">Kategori</label>
        <select v-model="filters.category" class="filter-input">
          <option value="">Semua</option>
          <option value="layak">Layak</option>
          <option value="tidak_layak">Tidak Layak</option>
        </select>
      </div>
      <button class="btn-filter" @click="fetchReports">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filter
      </button>
    </div>

    <!-- Error -->
    <div v-if="errorMsg" class="error-banner">{{ errorMsg }}</div>

    <!-- Table -->
    <div class="table-card">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <span>Memuat laporan...</span>
      </div>
      <table v-else-if="reports.length > 0" class="reports-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Pengguna</th>
            <th>Hasil</th>
            <th>Akurasi</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in reports" :key="r.id || i">
            <td class="td-num">{{ i + 1 }}</td>
            <td>{{ r.username || r.user?.username || '-' }}</td>
            <td>
              <span class="badge" :class="r.category === 'layak' ? 'badge--layak' : 'badge--tidak'">
                {{ r.category === 'layak' ? '✅ Layak' : '❌ Tidak Layak' }}
              </span>
            </td>
            <td>{{ r.confidence ? (r.confidence * 100).toFixed(1) + '%' : '-' }}</td>
            <td class="td-date">{{ formatDate(r.created_at) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-state">
        <div class="empty-icon">📋</div>
        <p>Tidak ada data laporan</p>
        <p class="empty-sub">Coba ubah filter atau rentang tanggal</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const reports = ref([])
const isLoading = ref(false)
const isExporting = ref(false)
const errorMsg = ref('')

const filters = ref({
  dateFrom: '',
  dateTo: '',
  category: '',
})

function getToken() {
  return localStorage.getItem('token') || localStorage.getItem('pakar_air_token') || ''
}

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` }
}

function formatDate(d) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

async function fetchReports() {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const params = {}
    if (filters.value.dateFrom) params.date_from = filters.value.dateFrom
    if (filters.value.dateTo) params.date_to = filters.value.dateTo
    if (filters.value.category) params.category = filters.value.category

    const res = await axios.get(`${API_BASE}/api/admin/reports`, {
      headers: authHeaders(),
      params,
    })
    reports.value = res.data.items || res.data
  } catch (err) {
    errorMsg.value = err.response?.data?.detail || 'Gagal memuat laporan.'
  } finally {
    isLoading.value = false
  }
}

async function exportCSV() {
  isExporting.value = true
  try {
    const params = {}
    if (filters.value.dateFrom) params.date_from = filters.value.dateFrom
    if (filters.value.dateTo) params.date_to = filters.value.dateTo
    if (filters.value.category) params.category = filters.value.category

    const res = await axios.get(`${API_BASE}/api/admin/reports/export`, {
      headers: authHeaders(),
      params,
      responseType: 'blob',
    })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = `pakar_air_laporan_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  } catch (err) {
    errorMsg.value = 'Gagal mengekspor laporan.'
  } finally {
    isExporting.value = false
  }
}

onMounted(fetchReports)
</script>

<style scoped>
.admin-reports { max-width: 1100px; }

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

.btn-export {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: #0f172a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-export:hover { background: #1e293b; }
.btn-export:disabled { opacity: 0.6; cursor: not-allowed; }

.filter-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  margin-bottom: 16px;
}
.filter-group { display: flex; flex-direction: column; gap: 5px; }
.filter-label { font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; }
.filter-input {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  font-size: 13px;
  color: #1e293b;
  background: #f8fafc;
  outline: none;
}
.filter-input:focus { border-color: #3b82f6; background: #fff; }
.btn-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-filter:hover { background: #2563eb; }

.error-banner {
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 13px;
  margin-bottom: 14px;
}

.table-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.reports-table {
  width: 100%;
  border-collapse: collapse;
}
.reports-table thead tr {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.reports-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}
.reports-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.1s;
}
.reports-table tbody tr:last-child { border-bottom: none; }
.reports-table tbody tr:hover { background: #fafbfc; }
.reports-table td { padding: 12px 16px; font-size: 13px; color: #1e293b; }
.td-num { color: #94a3b8; font-size: 12px; }
.td-date { color: #94a3b8; font-size: 12px; }

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}
.badge--layak { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.badge--tidak { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px;
  color: #64748b;
  font-size: 14px;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.empty-state {
  text-align: center;
  padding: 60px 20px;
}
.empty-icon { font-size: 40px; margin-bottom: 12px; }
.empty-state p { font-size: 14px; font-weight: 600; color: #0f172a; }
.empty-sub { font-size: 13px; color: #64748b; font-weight: 400; margin-top: 4px; }
</style>
