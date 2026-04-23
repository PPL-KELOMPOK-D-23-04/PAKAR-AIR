import { ref } from 'vue'
import { useAnalysisStore } from '../stores/analysisStore'
import { submitAnalysis } from '../api/analysis'

const REQUIRED_FIELDS = [
  'ph', 'hardness', 'solids', 'chloramines', 'sulfate',
  'conductivity', 'organic_carbon', 'trihalomethanes', 'turbidity',
]

export function useAnalysis() {
  const store = useAnalysisStore()
  const loading = ref(false)
  const error = ref('')

  async function submit() {
    error.value = ''

    // 1. Validate image
    if (!store.image) {
      error.value = 'Foto air wajib diupload.'
      return false
    }

    // 2. Validate all 9 manual fields are filled
    const missing = REQUIRED_FIELDS.filter(
      (k) => store.manualData[k] === null || store.manualData[k] === '' || store.manualData[k] === undefined
    )
    if (missing.length > 0) {
      error.value = `Semua parameter analisis wajib diisi (${missing.join(', ')}).`
      return false
    }

    // 3. Call API and save result
    try {
      loading.value = true
      const result = await submitAnalysis(store.image, store.manualData)
      store.setResult(result)
      return true
    } catch (err) {
      error.value =
        err?.response?.data?.message ||
        'Terjadi kesalahan saat memproses analisis. Silakan coba lagi.'
      return false
    } finally {
      loading.value = false
    }
  }

  return { loading, error, submit }
}