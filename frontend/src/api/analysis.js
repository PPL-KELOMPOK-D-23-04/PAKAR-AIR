import axios from 'axios'

/**
 * Submit analisis ke backend.
 * Maps lowercase store keys → PascalCase backend keys.
 * @param {Object} manualData - dari analysisStore.manualData
 * @param {File} image
 * @returns {string} analysis_id
 */
export async function submitAnalysis(manualData, image) {
  const formData = new FormData()
  formData.append('image', image)

  // FIX: Store pakai lowercase, RF classifier butuh PascalCase
  const mappedData = {
    ph:               Number(manualData.ph),
    Hardness:         Number(manualData.hardness),
    Solids:           Number(manualData.solids),
    Chloramines:      Number(manualData.chloramines),
    Sulfate:          Number(manualData.sulfate),
    Conductivity:     Number(manualData.conductivity),
    Organic_carbon:   Number(manualData.organic_carbon),
    Trihalomethanes:  Number(manualData.trihalomethanes),
    Turbidity:        Number(manualData.turbidity),
  }

  formData.append('manual_data', JSON.stringify(mappedData))

  const res = await axios.post('/api/analysis', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data.analysis_id
}

/**
 * Ambil hasil analisis lengkap dari backend.
 * @param {string} analysisId
 * @returns {Object|null} result object atau null kalau belum ada
 */
export async function getAnalysisResult(analysisId) {
  const res = await axios.get(`/api/analysis/${analysisId}`)
  return res.data.result ?? null
}

/**
 * Export riwayat analisis user sebagai file CSV.
 */
export async function exportHistoryCSV(filters = {}) {
  const { search, category, date } = filters
  const res = await axios.get('/api/analysis/export/csv', {
    params: { search, category, date },
    responseType: 'blob',
  })
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  const now = new Date().toISOString().slice(0, 10)
  link.setAttribute('download', `riwayat_analisis_${now}.csv`)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

/**
 * Ambil data lengkap satu analisis untuk di-render sebagai PDF di frontend.
 */
export async function getAnalysisExportDetail(analysisId) {
  const res = await axios.get(`/api/analysis/export/${analysisId}/detail`)
  return res.data
}

/**
 * Ambil riwayat analisis user (paginated) dengan filter opsional.
 * @param {number} page - Halaman saat ini
 * @param {Object} [filters={}] - Filter opsional
 * @param {string} [filters.search]   - Kata kunci pencarian sumber air
 * @param {string} [filters.category] - "layak" | "tidak_layak"
 * @param {string} [filters.date]     - Format YYYY-MM-DD
 * @param {number} [perPage=10]       - Jumlah item per halaman
 */
export async function getAnalysisHistory(page = 1, filters = {}, perPage = 10) {
  const { search, category, date } = filters
  const res = await axios.get('/api/analysis/history', {
    params: {
      page,
      per_page: perPage,
      search,    // undefined → tidak dikirim Axios secara otomatis
      category,
      date,
    },
  })
  return res.data
}