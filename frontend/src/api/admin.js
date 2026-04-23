/**
 * Admin API client — /api/admin/*
 * PKD20TP-9: Manajemen akun pengguna
 *
 * Covers:
 *  - GET  /api/admin/users         → listUsers()
 *  - PUT  /api/admin/users/:id/status → setUserStatus()  [PKD20TPA-33]
 *  - DELETE /api/admin/users/:id   → deleteUser()
 *  - GET  /api/admin/dashboard/stats → getDashboardStats()
 *  - GET  /api/admin/analysis/stats  → getAnalysisStats()
 *  - GET  /api/admin/reports         → getReports()
 *  - GET  /api/admin/reports/export  → exportReports()
 */

import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

/**
 * Dapatkan header auth dari localStorage (token disimpan oleh authStore)
 */
function authHeaders() {
  const token = localStorage.getItem('pakar_air_token')
  return { Authorization: `Bearer ${token}` }
}

// ─── User Management (KF-10) ─────────────────────────────────

/**
 * Ambil daftar semua pengguna (paginated)
 * @param {number} skip - offset (default 0)
 * @param {number} limit - jumlah data (default 100)
 * @returns {Promise<Array>} array ProfileResponse
 */
export async function listUsers(skip = 0, limit = 100) {
  const { data } = await axios.get(`${API_BASE}/api/admin/users`, {
    params: { skip, limit },
    headers: authHeaders(),
  })
  return data
}

/**
 * PKD20TPA-33: Aktifkan atau nonaktifkan akun pengguna
 * @param {string} userId - UUID pengguna
 * @param {boolean} isActive - true = aktifkan, false = nonaktifkan
 * @returns {Promise<{message: string, user_id: string}>}
 */
export async function setUserStatus(userId, isActive) {
  const { data } = await axios.put(
    `${API_BASE}/api/admin/users/${userId}/status`,
    null,
    {
      params: { is_active: isActive },
      headers: authHeaders(),
    }
  )
  return data
}

/**
 * Hapus akun pengguna secara permanen (cascade ke analyses, notifications, dll.)
 * @param {string} userId - UUID pengguna
 * @returns {Promise<{message: string, user_id: string}>}
 */
export async function deleteUser(userId) {
  const { data } = await axios.delete(
    `${API_BASE}/api/admin/users/${userId}`,
    { headers: authHeaders() }
  )
  return data
}

// ─── Dashboard & Reports ──────────────────────────────────────

/**
 * Ambil statistik dashboard admin (KF-09 + KF-11)
 * @returns {Promise<Object>} { users: {...}, analyses: {...}, results: {...} }
 */
export async function getDashboardStats() {
  const { data } = await axios.get(
    `${API_BASE}/api/admin/dashboard/stats`,
    { headers: authHeaders() }
  )
  return data
}

/**
 * Ambil statistik analisis detail (KF-11)
 * @returns {Promise<Object>} { monthly_trend: [...], average_confidence: number }
 */
export async function getAnalysisStats() {
  const { data } = await axios.get(
    `${API_BASE}/api/admin/analysis/stats`,
    { headers: authHeaders() }
  )
  return data
}

/**
 * Ambil data laporan dengan filter (KF-12)
 * @param {Object} filters
 * @param {string} [filters.dateFrom] - YYYY-MM-DD
 * @param {string} [filters.dateTo] - YYYY-MM-DD
 * @param {string} [filters.category] - 'layak' | 'tidak_layak'
 * @returns {Promise<{items: Array, total: number}>}
 */
export async function getReports({ dateFrom, dateTo, category } = {}) {
  const { data } = await axios.get(`${API_BASE}/api/admin/reports`, {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
      category,
    },
    headers: authHeaders(),
  })
  return data
}

/**
 * Export laporan sebagai CSV (KF-12)
 * @param {Object} filters - sama dengan getReports()
 * Otomatis men-trigger download file CSV
 */
export async function exportReports({ dateFrom, dateTo, category } = {}) {
  const response = await axios.get(`${API_BASE}/api/admin/reports/export`, {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
      category,
    },
    headers: authHeaders(),
    responseType: 'blob',
  })

  // Trigger download di browser
  const url = URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'pakar_air_report.csv')
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
