import { ref } from 'vue'
import { useAnalysisStore } from '@/stores/analysisStore'
import { submitAnalysis, getAnalysisResult } from '@/api/analysis'

export function useAnalysis() {
  const store = useAnalysisStore()
  const loading = ref(false)
  const error = ref(null)

  const isEmpty = (v) => v === null || v === undefined || v === ''
  const isInvalidNumber = (v) => isNaN(Number(v))

  const validateField = (key, value) => {
    if (isEmpty(value)) return `Field ${key} belum diisi`
    if (isInvalidNumber(value)) return `Field ${key} harus berupa angka`

    const num = Number(value)

    if (key === 'ph' && (num < 0 || num > 14)) {
      return 'pH harus antara 0 - 14'
    }

    if (num < 0) return `Field ${key} tidak boleh negatif`

    return null
  }

  const validateData = () => {
    if (!store.image) return 'Gambar belum diupload'

    for (const [key, value] of Object.entries(store.manualData)) {
      const error = validateField(key, value)
      if (error) return error
    }

    return null
  }

  const delay = (ms) => new Promise(res => setTimeout(res, ms))

  const fetchResultWithRetry = async (analysisId) => {
    let attempts = 0

    while (attempts < 3) {
      try {
        const result = await getAnalysisResult(analysisId)
        if (result) return result
      } catch (_) {}

      await delay(1000)
      attempts++
    }

    throw new Error('RESULT_NOT_READY')
  }

  const handleError = (err) => {
    if (err.message === 'RESULT_NOT_READY') {
      return 'Hasil belum siap, coba lagi'
    }

    if (!err.response) {
      return 'Gagal terhubung ke server'
    }

    return err.response?.data?.detail || 'Proses analisis gagal'
  }

  const analyze = async () => {
    error.value = null
    const validationError = validateData()
    if (validationError) {
      error.value = validationError
      return
    }

    loading.value = true
    try {
      store.resetResult()
      const analysisId = await submitAnalysis(store.manualData, store.image)
      const result = await fetchResultWithRetry(analysisId)
      store.result = result
    } catch (err) {
      error.value = handleError(err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    analyze,
    validateData,
  }
}