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
 * Ambil riwayat analisis user (paginated).
 * @param {number} page
 * @param {number} perPage
 */
export async function getAnalysisHistory(page = 1, perPage = 10) {
  const res = await axios.get('/api/analysis/history', {
    params: { page, per_page: perPage },
  })
  return res.data
}