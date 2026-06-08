<template>
  <div class="admin-reports">

    <!-- ── Header ── -->
    <header class="page-header">
      <div class="header-left">
        <p class="header-eyebrow">PakarAir — Sistem Administrasi</p>
        <h1 class="page-title">Laporan Analisis</h1>
        <p class="page-subtitle">Filter dan export data analisis kualitas air</p>
      </div>
      <button class="btn-export" @click="exportCSV" :disabled="isExporting || reports.length === 0">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {{ isExporting ? 'Mengekspor...' : 'Export CSV' }}
      </button>
    </header>

    <!-- ── Filter Bar ── -->
    <div class="filter-panel">
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
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Terapkan Filter
      </button>
    </div>

    <!-- ── Error ── -->
    <div v-if="errorMsg" class="error-strip">{{ errorMsg }}</div>

    <!-- ── Table ── -->
    <div class="table-card">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner" />
        <span>Memuat laporan...</span>
      </div>

      <table v-else-if="reports.length > 0" class="reports-table">
        <thead>
          <tr>
            <th class="th-num">#</th>
            <th>Pengguna</th>
            <th>Hasil</th>
            <th>Akurasi</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in reports" :key="r.id || i">
            <td><span class="cell-num">{{ i + 1 }}</span></td>
            <td><span class="td-user">{{ r.username || r.user?.username || '-' }}</span></td>
            <td>
              <span class="badge" :class="r.category === 'layak' ? 'badge--layak' : 'badge--tidak'">
                <span class="sdot" :class="r.category === 'layak' ? 'sdot--on' : 'sdot--off'" />
                {{ r.category === 'layak' ? 'Layak' : 'Tidak Layak' }}
              </span>
            </td>
            <td>
              <span class="td-conf">
                {{ r.confidence ? (r.confidence * 100).toFixed(1) + '%' : '—' }}
              </span>
            </td>
            <td><span class="td-date">{{ formatDate(r.created_at) }}</span></td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <p class="empty-title">Tidak ada data laporan</p>
        <p class="empty-sub">Coba ubah filter atau rentang tanggal</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const reports     = ref([])
const isLoading   = ref(false)
const isExporting = ref(false)
const errorMsg    = ref('')

const filters = ref({ dateFrom: '', dateTo: '', category: '' })

function getToken() {
  return sessionStorage.getItem('token') || sessionStorage.getItem('pakar_air_token') || ''
}
function authHeaders() { return { Authorization: `Bearer ${getToken()}` } }

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
    if (filters.value.dateTo)   params.date_to   = filters.value.dateTo
    if (filters.value.category) params.category  = filters.value.category
    const res = await axios.get(`${API_BASE}/api/admin/reports`, {
      headers: authHeaders(), params,
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
    if (filters.value.dateTo)   params.date_to   = filters.value.dateTo
    if (filters.value.category) params.category  = filters.value.category
    const res = await axios.get(`${API_BASE}/api/admin/reports/export`, {
      headers: authHeaders(), params, responseType: 'blob',
    })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = `pakar_air_laporan_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  } catch {
    errorMsg.value = 'Gagal mengekspor laporan.'
  } finally {
    isExporting.value = false
  }
}

onMounted(fetchReports)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.admin-reports {
  --mono: 'IBM Plex Mono', ui-monospace, monospace;
  --h-rule: var(--color-border);
  --h-rule-2: var(--color-border-light);
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
.btn-export {
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
  transition: opacity 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
.btn-export:hover:not(:disabled) { opacity: 0.8; }
.btn-export:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Filter Panel ── */
.filter-panel {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 16px;
  background: var(--color-surface);
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  margin-bottom: 16px;
}
.filter-group { display: flex; flex-direction: column; gap: 5px; }
.filter-label {
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.filter-input {
  padding: 7px 11px;
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--color-text-primary);
  background: var(--color-bg);
  outline: none;
  letter-spacing: 0.02em;
  transition: border-color 0.15s;
}
.filter-input:focus {
  border-color: var(--color-accent);
  background: var(--color-surface);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.btn-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  background: var(--color-accent);
  color: var(--color-surface);
  border: none;
  border-radius: 2px;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: opacity 0.15s;
}
.btn-filter:hover { opacity: 0.85; }

/* ── Error ── */
.error-strip {
  padding: 10px 14px;
  border: 1px solid var(--color-danger-border);
  border-radius: 2px;
  background: var(--color-danger-bg);
  color: var(--color-danger-text);
  font-family: var(--mono);
  font-size: 11px;
  margin-bottom: 14px;
}

/* ── Table ── */
.table-card {
  border: 1px solid var(--h-rule);
  border-radius: 2px;
  overflow: hidden;
  background: var(--color-surface);
}
.reports-table {
  width: 100%;
  border-collapse: collapse;
}
.reports-table thead tr {
  background: var(--color-bg);
  border-bottom: 1px solid var(--h-rule);
}
.reports-table th {
  padding: 10px 14px;
  text-align: left;
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  white-space: nowrap;
}
.th-num { width: 40px; }
.reports-table tbody tr {
  border-bottom: 1px solid var(--h-rule-2);
  transition: background 0.1s;
}
.reports-table tbody tr:last-child { border-bottom: none; }
.reports-table tbody tr:hover { background: var(--color-bg); }
.reports-table td { padding: 11px 14px; vertical-align: middle; }

.cell-num {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
}
.td-user {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}
.td-conf {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-secondary);
  letter-spacing: 0.04em;
}
.td-date {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--color-text-muted-light);
}

/* ── Badge ── */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 1px;
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
}
.badge--layak { background: var(--color-success-bg); color: var(--color-success-text); border: 1px solid var(--color-success-border); }
.badge--tidak { background: var(--color-danger-bg);  color: var(--color-danger-text);  border: 1px solid var(--color-danger-border); }
.sdot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.sdot--on  { background: var(--color-success-text); }
.sdot--off { background: var(--color-danger-text); }

/* ── Loading ── */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px;
  color: var(--color-text-muted);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
}
.spinner {
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--h-rule);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Empty ── */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}
.empty-title {
  font-family: var(--mono);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}
.empty-sub {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--color-text-muted);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .page-header { flex-direction: column; align-items: flex-start; }
  .filter-panel { flex-direction: column; }
}
</style>