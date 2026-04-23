import api from './axios'

/**
 * PKD20TPA-6: Submit multimodal water quality analysis.
 * @param {File} image
 * @param {Object} manualData - { ph, hardness, solids, chloramines, sulfate,
 *                               conductivity, organic_carbon, trihalomethanes, turbidity }
 * @returns {Promise<{ category, confidence, recommendation, explanation }>}
 */
export async function submitAnalysis(image, manualData) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('manual_data', JSON.stringify(manualData))

  const response = await api.post('/api/analysis', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}