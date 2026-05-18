import axios from 'axios'

// Pastikan base URL mengarah ke port 8000
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

/**
 * Submit analisis ke backend.
 */
export async function submitAnalysis(manualData, image) {
  const token = localStorage.getItem('token') // Ambil token
  const formData = new FormData()
  formData.append('image', image)

  const mappedData = {
    ph: Number(manualData.ph),
    Hardness: Number(manualData.hardness),
    Solids: Number(manualData.solids),
    Chloramines: Number(manualData.chloramines),
    Sulfate: Number(manualData.sulfate),
    Conductivity: Number(manualData.conductivity),
    Organic_carbon: Number(manualData.organic_carbon),
    Trihalomethanes: Number(manualData.trihalomethanes),
    Turbidity: Number(manualData.turbidity),
  }

  formData.append('manual_data', JSON.stringify(mappedData))

  const res = await axios.post(`${API_BASE}/api/analysis`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}` // Tambahkan token
    },
  })

  return res.data.analysis_id
}

/**
 * Ambil hasil analisis lengkap.
 */
export async function getAnalysisResult(analysisId) {
  const token = localStorage.getItem('token')
  const res = await axios.get(`${API_BASE}/api/analysis/${analysisId}`, {
    headers: { 'Authorization': `Bearer ${token}` } // Tambahkan token
  })
  return res.data.result ?? null
}

/**
 * Ambil riwayat analisis user.
 */
export async function getAnalysisHistory(page = 1, filters = {}, perPage = 10) {
  const token = localStorage.getItem('token') // 1. Ambil token dari storage
  const { search, category, date } = filters

  // 2. Tambahkan API_BASE dan headers Authorization
  const res = await axios.get(`${API_BASE}/api/analysis/history`, {
    params: {
      page,
      per_page: perPage,
      search,
      category,
      date,
    },
    headers: {
      'Authorization': `Bearer ${token}` // 3. Tiket masuk ke backend
    }
  })
  return res.data
}