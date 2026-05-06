import apiClient from '@/api/axios'

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

  const res = await apiClient.post('/api/analysis', formData, {
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
  const res = await apiClient.get(`/api/analysis/${analysisId}`)
  return res.data.result ?? null
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
  const res = await apiClient.get('/api/analysis/history', {
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