import api from './axios'

/**
 * Map store's lowercase keys → backend's expected casing (per rf_classifier.py).
 * @param {Object} manualData
 */
function toBackendKeys(manualData) {
  return {
    ph: manualData.ph,
    Hardness: manualData.hardness,
    Solids: manualData.solids,
    Chloramines: manualData.chloramines,
    Sulfate: manualData.sulfate,
    Conductivity: manualData.conductivity,
    Organic_carbon: manualData.organic_carbon,
    Trihalomethanes: manualData.trihalomethanes,
    Turbidity: manualData.turbidity,
  }
}

/**
 * PKD20TPA-5: Step 1 — Submit image + manual data.
 * POST /api/analysis
 * Returns { analysis_id, status, message }
 *
 * @param {File} image
 * @param {Object} manualData  store shape (lowercase keys)
 * @returns {Promise<{ analysis_id: string, status: string, message: string }>}
 */
export async function submitAnalysis(image, manualData) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('manual_data', JSON.stringify(toBackendKeys(manualData)))

  const response = await api.post('/api/analysis', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}

/**
 * PKD20TPA-6: Step 2 — Fetch fused result by analysis_id.
 * GET /api/analysis/{analysis_id}
 * Returns { category, confidence, explanation, recommendation, ... }
 *
 * @param {string} analysisId
 * @returns {Promise<{ category: string, confidence: number, explanation: string, recommendation: string }>}
 */
export async function getAnalysisResult(analysisId) {
  const response = await api.get(`/api/analysis/${analysisId}`)
  return response.data
}